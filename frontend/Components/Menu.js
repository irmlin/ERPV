import React, {useState} from "react";
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
  Modal, 
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { CameraContext } from "../Contexts/CameraContext";
import { logout } from "../Services/AuthService";

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

  const handleCoursesButtonClick = () => {
    navigation.navigate("Courses");
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleLogoutYesButtonClick = async () => {
    
    const response = await logout()
    if (response.status === 200) {
      navigation.navigate("Login")
      }
    else if (response.status === 400) {
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

  const stylesLogout = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: "10%",
      alignItems: 'center',
      shadowColor: '#000',
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
      alignSelf: 'flex-end',
      flexDirection: "row",
      height: "8%",
      width: "9%",
      marginEnd: "2%",
    },
    button2: {
      alignSelf: 'flex-start',
      marginTop: "5%",
      padding: 10,
      borderRadius: 10,
    },
    button3: {
      alignSelf: 'flex-end',
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
      backgroundColor: 'white',
    },
    buttonClose: {
      backgroundColor: '#6DD8E7',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 17,
    },
    modalText: {
      textAlign: 'center',
      fontSize: 27,
    },
  });

  return (
    <View style={styles.parent}>
      <ImageBackground
        source={require("frontend/assets/background_quiz-01.png")}
        style={styles.image}
      >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={stylesLogout.centeredView}>
          <View style={stylesLogout.modalView}>
            <Text style={stylesLogout.modalText}>Ar norite atsijungti?</Text>
            <View style={{flexDirection:"row"}} >
            <Pressable
              style={[stylesLogout.button2, stylesLogout.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={stylesLogout.textStyle}> Ne </Text>
            </Pressable>
            <View style={stylesLogout.space} />
            <Pressable
              style={[stylesLogout.button3, stylesLogout.buttonClose]}
              onPress={handleLogoutYesButtonClick}>
              <Text style={stylesLogout.textStyle}> Taip </Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/*Mygtukas meniu*/}
      <Pressable
        style={[stylesLogout.button]}
        onPress={() => setModalVisible(true)}>
        <Image
          source={require("frontend/assets/icons/log-out.png")}
          style={stylesLogout.buttonImageIconStyle}
        />
      </Pressable>

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
