import React from "react";
import { useContext } from "react";
import {
  View,
  Button,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
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
    navigation.navigate("Profile");
  };

  const handleAvatarButtonClick = () => {
    navigation.navigate("Avatar");
  };

  const handleQuizButtonClick = () => {
    navigation.navigate("Quiz");
  };

  const handleGameButtonClick = () => {
    navigation.navigate("Game");
  };


  const styles = StyleSheet.create({
    parent: {
      width: "100%",
      height: "100%",
      backgroundColor: "#add8e6",
      margin: 0,
    }
  });

  return (
    <View style={styles.parent}>
      <StyledButton onPressAction={handleProfileButtonClick} buttonText={"Profilis"}/>
      <StyledButton onPressAction={handleAvatarButtonClick} buttonText={"Avatarai"}/>
      <StyledButton onPressAction={handleQuizButtonClick} buttonText={"Klausimynas"}/>
      <StyledButton onPressAction={handleStartCamera} buttonText={"Pakuočių skenavimas"}/>
      <StyledButton onPressAction={handleGameButtonClick} buttonText={"Žaidimas"}/>
    </View>
  );
}
