import React from "react";
import { useContext } from "react";
import {
  View,
  Button,
  Image,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { CameraContext } from "../Contexts/CameraContext";
import StyledButton from "./StyledButton";

export default function Menu() {
  const navigation = useNavigation();
  const { cameraStarted, setCameraStarted } = useContext(CameraContext);

  const handleStartCamera = async () => {
    const status = await Camera.requestCameraPermissionsAsync();
    if (status.status === "granted") {
      navigation.navigate("Scan");
      setCameraStarted(true);
    } else {
      Alert.alert("Camera access denied");
    }
  };

  const handleProfileButtonClick = () => {
    navigation.navigate("Home");
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
  });

  const stylesb = StyleSheet.create({
    button: {
      flexDirection: "row",
      height: "8%",
      width: "60%",
      alignItems: "center",
      marginTop: "5%",
      marginLeft: "20%",
      elevation: 10,
      borderRadius: 15,
      borderColor: "white",
      borderWidth: 5,

      justifyContent: "center",
    },
    text: {
      fontSize: 27,
      fontWeight: "bold",
      color: "white",
    },
    buttonImageIconStyle: {
      height: "70%",
      width: "20%",
      resizeMode: "contain",
    },
    image: {
      width: 250,
      height: 250,
      alignSelf: "center",
    },
  });

  return (
    <View style={styles.parent}>
      <ImageBackground
        source={require("frontend/assets/background_quiz-01.png")}
        style={styles.image}
      >
        <View style={styles.imageBlock}>
          <Image
            source={require("frontend/assets/Logo_baltas.png")}
            style={stylesb.image}
          ></Image>
        </View>
        <TouchableOpacity
          activeOpacity={0.95}
          style={[stylesb.button, { backgroundColor: "#FAC643" }]}
          onPress={handleProfileButtonClick}
        >
          <Image
            source={require("frontend/assets/profilio_ikona-01.png")}
            style={stylesb.buttonImageIconStyle}
          />
          <Text style={stylesb.text}>Profilis</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.95}
          style={[stylesb.button, { backgroundColor: "#70D66E" }]}
          onPress={handleAvatarButtonClick}
        >
          <Image
            source={require("frontend/assets/avataru_ikona-01.png")}
            style={stylesb.buttonImageIconStyle}
          />
          <Text style={stylesb.text}>Avatarai</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.95}
          style={[stylesb.button, { backgroundColor: "#6DD8E7" }]}
          onPress={handleQuizButtonClick}
        >
          <Image
            source={require("frontend/assets/klausimyno_ikona-01.png")}
            style={stylesb.buttonImageIconStyle}
          />
          <Text style={stylesb.text}>Klausimynas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.95}
          style={[stylesb.button, { backgroundColor: "#FAC643" }]}
          onPress={handleStartCamera}
        >
          <Image
            source={require("frontend/assets/skenavimo_ikona-01.png")}
            style={stylesb.buttonImageIconStyle}
          />
          <Text style={stylesb.text}>Skenavimas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.95}
          style={[stylesb.button, { backgroundColor: "#70D66E" }]}
          onPress={handleCoursesButtonClick}
        >
          <Image
            source={require("frontend/assets/laboratorijos_ikona.png")}
            style={stylesb.buttonImageIconStyle}
          />
          <Text style={stylesb.text}>Mokslo kampelis</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
