import React, { useState } from "react";
import { useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  ImageBackground,
  Modal,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { CameraContext } from "../Contexts/CameraContext";
import { GlobalAlertContext } from "../Contexts/GlobalAlertContext";
import { BACKGROUND } from "../assets/theme";
import { logout } from "../Services/AuthService";
import MenuButton from "./MenuButton";

export default function Menu() {
  const navigation = useNavigation();
  const { cameraStarted, setCameraStarted } = useContext(CameraContext);
  const { setAlertOpen, setAlertColor, setAlertText } =
    useContext(GlobalAlertContext);

  const handleStartCamera = async () => {
    const status = await Camera.requestCameraPermissionsAsync();
    if (status.status === "granted") {
      navigation.navigate("Scan");
      setCameraStarted(true);
    } else {
      setAlertColor("error");
      setAlertText("Kameros prieiga atmesta!");
      setAlertOpen(true);
    }
  };

  const handleProfileButtonClick = () => {
    navigation.navigate("Profile");
  };

  const handleAvatarButtonClick = () => {
    navigation.navigate("Avatar");
  };

  const handleQuizButtonClick = () => {
    navigation.navigate("Quiz");
  };

  const handleCoursesButtonClick = () => {
    navigation.navigate("Courses");
  };

  const handleLootboxButtonClick = () => {
    navigation.navigate("Lootbox");
  };

  const menuButtonsInfo = [
    [
      require("frontend/assets/icons/profilio_ikona-01.png"),
      "Profilis",
      "#FAC643",
      handleProfileButtonClick,
    ],
    [
      require("frontend/assets/icons/avataru_ikona-01.png"),
      "Avatarai",
      "#70D66E",
      handleAvatarButtonClick,
    ],
    [
      require("frontend/assets/icons/klausimyno_ikona-01.png"),
      "Klausimynas",
      "#6DD8E7",
      handleQuizButtonClick,
    ],
    [
      require("frontend/assets/icons/skenavimo_ikona-01.png"),
      "Skenavimas",
      "#FAC643",
      handleStartCamera,
    ],
    [
      require("frontend/assets/icons/laboratorijos_ikona.png"),
      "Laboratorija",
      "#70D66E",
      handleCoursesButtonClick,
    ],
    [
      require("frontend/assets/badge.png"),
      "Loterija",
      "#6DD8E7",
      handleLootboxButtonClick,
    ],
  ];

  const [modalVisible, setModalVisible] = useState(false);

  const handleLogoutYesButtonClick = async () => {
    const response = await logout();
    if (response.status === 200) {
      navigation.navigate("Login");
    } else if (response.status === 400) {
      displayAlert("error", response.data.message);
    }
  };

  const styles = StyleSheet.create({
    parent: {
      width: "100%",
      height: "100%",
      backgroundColor: "#FAC643",
      margin: 0,
    },
    image: {
      flex: 1,
      justifyContent: "center",
    },
    logoImage: {
      width: 250,
      height: 250,
      alignSelf: "center",
    },
  });

  const stylesLogout = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: "10%",
      alignItems: "center",
      shadowColor: "#000",
      height: "25%",
      borderColor: "black",
      borderWidth: 5,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      alignSelf: "flex-end",
      flexDirection: "row",
      height: "5%",
      width: "9%",
      marginEnd: "10%",
      position: "absolute",
      top: "5%",
    },
    button2: {
      alignSelf: "flex-start",
      marginTop: "5%",
      padding: 10,
      borderRadius: 10,
    },
    button3: {
      alignSelf: "flex-end",
      marginTop: "5%",
      padding: 10,
      borderRadius: 10,
    },
    space: {
      width: "20%",
      height: 20,
    },
    buttonImageIconStyle: {
      height: "100%",
      width: "100%",
      resizeMode: "contain",
    },
    buttonOpen: {
      backgroundColor: "white",
    },
    buttonClose: {
      backgroundColor: "#6DD8E7",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 17,
    },
    modalText: {
      textAlign: "center",
      fontSize: 27,
    },
  });

  return (
    <View style={styles.parent}>
      <ImageBackground source={BACKGROUND} style={styles.image}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={stylesLogout.centeredView}>
            <View style={stylesLogout.modalView}>
              <Text style={stylesLogout.modalText}>Ar norite atsijungti?</Text>
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  style={[stylesLogout.button2, stylesLogout.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={stylesLogout.textStyle}> Ne </Text>
                </Pressable>
                <View style={stylesLogout.space} />
                <Pressable
                  style={[stylesLogout.button3, stylesLogout.buttonClose]}
                  onPress={handleLogoutYesButtonClick}
                >
                  <Text style={stylesLogout.textStyle}> Taip </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        {/*Mygtukas meniu*/}

        <Pressable
          style={[stylesLogout.button]}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={require("frontend/assets/icons/log-out.png")}
            style={stylesLogout.buttonImageIconStyle}
          />
        </Pressable>

        <View style={styles.imageBlock}>
          <Image
            source={require("frontend/assets/logo/Logo_baltas.png")}
            style={styles.logoImage}
          ></Image>
        </View>
        <>
          {menuButtonsInfo.map((info, i) => (
            <MenuButton
              iconImage={info[0]}
              text={info[1]}
              backgroundColor={info[2]}
              onClick={info[3]}
              key={i}
            />
          ))}
        </>
      </ImageBackground>
    </View>
  );
}
