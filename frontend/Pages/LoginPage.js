import React from "react";
import { useState, useContext } from "react";
import {
  View,
  TextInput,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import StyledButton from "frontend/Components/StyledButton.js";
import { useNavigation } from "@react-navigation/native";
import { login } from "../Services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalAlertContext } from "../Contexts/GlobalAlertContext";

export default function LoginPage() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { width, height } = Dimensions.get("window");
  const fontScale = Math.min(width, height) / 400;

  const { setAlertOpen, setAlertColor, setAlertText } =
    useContext(GlobalAlertContext);

  function displayAlert(color, text) {
    setAlertColor(color);
    setAlertText(text);
    setAlertOpen(true);
  }

  function validateEmptyFields() {
    if (!userName) {
      displayAlert("error", "Įveskite vartotojo vardą!");
      return false;
    } else if (!password) {
      displayAlert("error", "Įveskite slaptažodį!");
      return false;
    }
    return true;
  }

  const handleLoginButtonClick = async () => {
    if (!validateEmptyFields()) {
      return;
    }

    const response = await login(userName, password);
    if (response) {
      if (response.status === 200) {
        const jwtCookie = response.headers.get("Set-Cookie");
        if (jwtCookie) {
          const cookieValue = jwtCookie[0].split(";")[0];
          await AsyncStorage.setItem("JWT_COOKIE", cookieValue);
          navigation.navigate("Home");
        } else {
          console.log("No cookie received in response headers.");
        }
      } else if (response.status === 400) {
        displayAlert("error", response.data.message);
      } else {
        displayAlert("error", "Neteisingi vartotojo duomenys!");
      }
    } else {
      displayAlert("error", "No response from the server!");
    }
  };

  const handleRegistrationButtonClick = () => {
    navigation.navigate("Register");
  };

  const styles = StyleSheet.create({
    pageStructure: {
      width: "100%",
      height: "100%",
      margin: 0,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    textBlock: {
      width: "75%",
      textAlign: "center",
      color: "#212427",
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 25,
      marginBottom: 25,
      fontWeight: "bold",
      fontSize: 28 * fontScale,
    },
    inputBackground: {
      marginTop: 5,
      marginBottom: 25,
      resizeMode: "contain",
      justifyContent: "center",
      alignItems: "center",
      width: width * 0.8,
      height: height * 0.12,
      position: "relative",
    },
    textInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
      fontStyle: "italic",
      textAlign: "center",
      position: "absolute",
      bottom: 0,
      alignSelf: "center",
      fontSize: 18 * fontScale,
      fontWeight: "bold",
    },
  });

  return (
    <ImageBackground
      source={require("frontend/assets/backgrounds/LogIn_background-05.png")}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.pageStructure}>
        <Text style={styles.textBlock}>
          Sveikas sugrįžęs!{"\n"}Prisijunk, kad galėtum kaupti savo taškus!
        </Text>

        <ImageBackground
          source={require("frontend/assets/icons/Login_Debeselis1.png")}
          style={styles.inputBackground}
        >
          <TextInput
            style={styles.textInput}
            placeholder="Vartotojo Vardas"
            placeholderTextColor="#003f5c"
            onChangeText={(userNameInput) => setUserName(userNameInput)}
          />
        </ImageBackground>
        <ImageBackground
          source={require("frontend/assets/icons/Login_Debeselis2.png")}
          style={styles.inputBackground}
        >
          <TextInput
            style={styles.textInput}
            placeholder="Slaptažodis"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(passwordInput) => setPassword(passwordInput)}
          />
        </ImageBackground>
        <StyledButton
          buttonText={"Prisijungti"}
          onPressAction={handleLoginButtonClick}
          buttonColor="#6DD8E7"
        ></StyledButton>
        <StyledButton
          buttonText={"Pamiršai slaptažodį?"}
          buttonColor="#FAC643"
        ></StyledButton>
        <StyledButton
          buttonText={"Registruotis"}
          onPressAction={handleRegistrationButtonClick}
          buttonColor="#70D66E"
        ></StyledButton>
      </View>
    </ImageBackground>
  );
}
