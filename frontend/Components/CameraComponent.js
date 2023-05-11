import { StatusBar } from "expo-status-bar";
import { useContext, useRef, useState } from "react";
import * as FileSystem from "expo-file-system";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Image,
  Animated,
  Modal,
} from "react-native";
import { Camera } from "expo-camera";
import { CameraContext } from "../Contexts/CameraContext";
import CameraPreview from "./CameraPreview";
import { scanPackage } from "../Services/ScannerService";
import { GlobalAlertContext } from "../Contexts/GlobalAlertContext";
import { BACKGROUND, SCAN_PAGE_DOG } from "../assets/theme";
import { RECYCLING_GROUPS, SCANNER_STATES } from "../data/RecyclingCodesData";
import FadeView from "./FadeAnimation";
import Icon from "react-native-vector-icons/FontAwesome5";
import ScannerGuidePopup from "./ScannerGuidePopup";

export default function CameraComponent() {
  const cameraRef = useRef(null);
  const { setAlertOpen, setAlertColor, setAlertText } =
    useContext(GlobalAlertContext);
  const { cameraStarted, setCameraStarted } = useContext(CameraContext);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flashMode, setFlashMode] = useState("off");
  const [boxes, setBoxes] = useState([]);
  const [classes, setClasses] = useState([]);
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [popupOpen, setPopUpOpen] = useState(true);
  const [containerState, setContainerState] = useState({
    visible: false,
    toggle: false,
    image: require("frontend/assets/icons/Plastikas-02.png"),
  });
  const [scannerState, setScannerState] = useState(SCANNER_STATES.IDLE);
  const [lowerMessageState, setLowerMessageState] = useState({
    color: SCANNER_STATES.IDLE.COLOR,
    text: SCANNER_STATES.IDLE.TEXT,
    visible: true,
  });
  const [upperMessageState, setUpperMessageState] = useState({
    color: SCANNER_STATES.SUCCESS_YELLOW.COLOR,
    text: SCANNER_STATES.SUCCESS_YELLOW.TEXT,
    visible: false,
  });

  const handleOpenPopup = () => {
    setPopUpOpen(true);
  };

  const handleClosePopup = () => {
    setPopUpOpen(false);
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;

    const image = await new Promise(async (resolve) => {
      setLoading(true);
      await cameraRef.current.takePictureAsync({ onPictureSaved: resolve });
      cameraRef.current.pausePreview();
    });
    cameraRef.current.resumePreview();

    setLoading(false);
    setTimeout(() => setPreviewVisible(true), 1);
    setCapturedImage(image);
    setButtonEnabled(false);
    setLowerMessageState({
      ...lowerMessageState,
      visible: false,
    });

    await detectSigns(image);
  };

  const detectSigns = async (image) => {
    const base64Image = await FileSystem.readAsStringAsync(image.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    setLoading(true);
    const response = await scanPackage(base64Image);
    setLoading(false);

    if (response) {
      if (response.status === 200) {
        const predictionData = JSON.parse(response.data);

        console.log("Received", predictionData["bboxes"].length, "predictions");

        if (
          !predictionData["bboxes"].length ||
          RECYCLING_GROUPS.NONE.CLASSES.includes(
            predictionData["classes"][0]["class_ids"][0]
          ) ||
          predictionData["classes"][0]["scores"][0] < 0.75
        ) {
          activateErrorMessage();
          return;
        }

        const processedBboxes = [];
        predictionData["bboxes"].map((bboxData) => {
          let [x1, y1] = bboxData.slice(0, 2);
          let [x2, y2] = bboxData.slice(2, 4);
          let boxWidth = x2 - x1;
          let boxHeight = y2 - y1;
          let confidence = bboxData[4];
          processedBboxes.push([x1, y1, boxWidth, boxHeight, confidence]);
        });

        const predictedClasses = [];
        predictionData["classes"].map((classesData) => {
          predictedClasses.push([
            classesData["class_ids"][0],
            classesData["scores"][0],
          ]);
        });

        activateContainer(predictedClasses[0][0]);

        setBoxes(processedBboxes);
        console.log(predictedClasses);
        setClasses(predictedClasses);
      } else {
        console.log(
          "Bad request while processing image, refer to computer_vision api logs"
        );
      }
    } else {
      console.log("Server error occured while processing image");
    }
  };

  function activateErrorMessage() {
    setLowerMessageState({
      ...lowerMessageState,
      visible: true,
      color: SCANNER_STATES.ERROR.COLOR,
      text: SCANNER_STATES.ERROR.TEXT,
    });
  }

  function activateContainer(predictedClass) {
    let newImage = containerState.image;
    if (RECYCLING_GROUPS.YELLOW.CLASSES.includes(predictedClass)) {
      newImage = require("frontend/assets/icons/Plastikas-02.png");
      setUpperMessageState({
        ...upperMessageState,
        visible: true,
        text: SCANNER_STATES.SUCCESS_YELLOW.TEXT,
        color: SCANNER_STATES.SUCCESS_YELLOW.COLOR,
      });
    } else if (RECYCLING_GROUPS.GREEN.CLASSES.includes(predictedClass)) {
      newImage = require("frontend/assets/icons/Stiklas-02.png");
      setUpperMessageState({
        ...upperMessageState,
        visible: true,
        text: SCANNER_STATES.SUCCESS_GREEN.TEXT,
        color: SCANNER_STATES.SUCCESS_GREEN.COLOR,
      });
    } else if (RECYCLING_GROUPS.BLUE.CLASSES.includes(predictedClass)) {
      newImage = require("frontend/assets/icons/Popierius-02.png");
      setUpperMessageState({
        ...upperMessageState,
        visible: true,
        text: SCANNER_STATES.SUCCESS_BLUE.TEXT,
        color: SCANNER_STATES.SUCCESS_BLUE.COLOR,
      });
    } else {
      activateErrorMessage();
      return;
    }

    setContainerState({
      image: newImage,
      visible: true,
      toggle: !containerState.toggle,
    });
  }

  const hideContainer = () => {
    setContainerState({
      ...containerState,
      toggle: !containerState.toggle,
      visible: false,
    });
  };

  const showLowerIdleMessage = () => {
    setLowerMessageState({
      ...lowerMessageState,
      visible: true,
      color: SCANNER_STATES.IDLE.COLOR,
      text: SCANNER_STATES.IDLE.TEXT,
    });
  };

  const hideUpperMessage = () => {
    setUpperMessageState({
      ...upperMessageState,
      visible: false,
    });
  };

  const savePhoto = () => {};

  const retakePhoto = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    setBoxes([]);
    setClasses([]);
    setButtonEnabled(true);
    hideContainer();
    showLowerIdleMessage();
    hideUpperMessage();
  };

  const handleFlashMode = () => {
    console.log(flashMode);
    if (flashMode === "on") {
      setFlashMode("off");
    } else if (flashMode === "off") {
      setFlashMode("on");
    } else {
      setFlashMode("auto");
    }
  };

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: "#FAC643",
    },
    image: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: "4%",
    },
    bottomImage: {
      // overflow: "visible",
      position: "absolute",
      left: "-65%",
      top: "-8%",
      width: 280,
      height: 220,
    },
    info_button: {
      justifyContent: "flex-end",
      flexDirection: "row",
    },
  });

  return (
    <View style={styles.container}>
      <ScannerGuidePopup open={popupOpen} onClose={handleClosePopup} />
      <ImageBackground source={BACKGROUND} style={[styles.image, popupOpen && {opacity: 0.03}]}>
        {cameraStarted && (
          <View
            style={{
              width: "100%",
              height: "65%",
              borderWidth: 5,
              marginTop: "20%",
              borderColor: "white",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            {previewVisible && capturedImage ? (
              <CameraPreview
                photo={capturedImage}
                boxes={boxes}
                savePhoto={savePhoto}
                retakePhoto={retakePhoto}
                upperMessageState={upperMessageState}
                loading={loading}
              />
            ) : (
              <Camera
                style={{ flex: 1, borderRadius: 40 }}
                ref={cameraRef}
                flashMode={flashMode}
              >
                <View
                  style={{
                    flex: 1,
                    width: "100%",
                    backgroundColor: "transparent",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      left: "5%",
                      top: "10%",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={handleFlashMode}
                      style={{
                        backgroundColor: flashMode === "off" ? "#000" : "#fff",
                        borderRadius: 20,
                        height: 30,
                        width: 30,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 23,
                        }}
                      >
                        ⚡️
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <ActivityIndicator
                    size={90}
                    color="#00ff00"
                    animating={loading}
                    style={{ flex: 1 }}
                  />
                </View>
              </Camera>
            )}
          </View>
        )}

        <View
          style={{
            width: "100%",
            marginTop: "5%",
            height: "25%",
            flex: 1,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "33%",
              height: "100%",
              // overflow: "visible",
              position: "relative",
            }}
          >
            <ImageBackground
              source={SCAN_PAGE_DOG}
              resizeMode="contain"
              style={styles.bottomImage}
            />
          </View>
          <View
            style={{
              width: "33%",
              height: "100%",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={takePicture} disabled={!buttonEnabled}>
              <View
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  borderWidth: 4,
                  borderColor: "white",
                  backgroundColor: buttonEnabled ? "#dc143c" : "#ff726f",
                  justifyContent: "center",
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                width: 180,
                height: 70,
                borderRadius: 10,
                borderWidth: 4,
                marginTop: 15,
                borderColor: "white",
                backgroundColor: lowerMessageState.color,
                justifyContent: "center",
                alignItems: "center",
                display: lowerMessageState.visible ? "flex" : "none",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  fontWeight: "bold",
                  width: "90%",
                }}
              >
                {lowerMessageState.text}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "33%",
              height: "100%",
              // overflow: "visible",
              position: "relative",
            }}
          >
            <ImageBackground
              source={containerState.image}
              resizeMode={"contain"}
              style={{
                display: containerState.visible ? "flex" : "none",
                ...styles.bottomImage,
              }}
            />
            <TouchableOpacity
              style={styles.info_button}
              onPress={handleOpenPopup}
            >
              {/* <Icon source={require("./info-icon.png")} style={styles.info_button_icon} /> */}
              <Icon size={30} color="black" name="info-circle" />
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}
