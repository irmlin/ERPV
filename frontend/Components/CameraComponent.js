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
} from "react-native";
import { Camera } from "expo-camera";
import { CameraContext } from "../Contexts/CameraContext";
import CameraPreview from "./CameraPreview";
import { scanPackage } from "../Services/ScannerService";
import { GlobalAlertContext } from "../Contexts/GlobalAlertContext";
import { BACKGROUND, SCAN_PAGE_DOG } from "../assets/theme";

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

    await detectSigns(image);
  };

  const detectSigns = async (image) => {
    const base64Image = await FileSystem.readAsStringAsync(image.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const response = await scanPackage(base64Image);

    if (response) {
      if (response.status === 200) {
        const predictionData = JSON.parse(response.data);
        console.log(predictionData["classes"][0]["class_ids"], predictionData["classes"]);
        if (predictionData["bboxes"].length) {
          console.log(
            "Received",
            predictionData["bboxes"].length,
            "predictions"
          );
        } else {
          setAlertColor("error");
          setAlertText("Rūšiavimo ženkliukų neaptikta!");
          setAlertOpen(true);
          console.log("Received 0 predictions");
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
          predictedClasses.push([classesData["class_ids"][0], classesData["scores"][0]])
        })

        setBoxes(processedBboxes);console.log(predictedClasses);
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

  const savePhoto = () => {};

  const retakePhoto = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    setBoxes([]);
    setButtonEnabled(true);
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
      overflow: "visible",
      position: "absolute",
      left: "-65%",
      top: "-22%",
      width: 300,
      height: 245,
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={BACKGROUND} style={styles.image}>
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
              overflow: "visible",
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
                  backgroundColor: buttonEnabled ? "#dc143c" : "#ff726f",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: "white",
                    backgroundColor: "transparent",
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "33%",
              height: "100%",
            }}
          ></View>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}
