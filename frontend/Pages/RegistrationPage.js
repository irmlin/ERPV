import React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import StyledButton from "frontend/Components/StyledButton.js";
import { registerNewUser } from "../Services/AuthService";
import { GlobalAlertContext } from "../Contexts/GlobalAlertContext";

export default function RegistrationPage({ navigation }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlertOpen, setAlertColor, setAlertText } =
    useContext(GlobalAlertContext);

  function displayAlert(color, text) {
    setAlertColor(color);
    setAlertText(text);
    setAlertOpen(true);
  }

  const { width, height } = Dimensions.get("window");
  const fontScale = Math.min(width, height) / 400;

  function validateEmptyFields() {
    if (!userName) {
      displayAlert("error", "Įveskite vartotojo vardą!");
      return false;
    } else if (!email) {
      displayAlert("error", "Įveskite elektroninio pašto adresą!");
      return false;
    } else if (!password) {
      displayAlert("error", "Įveskite slaptažodį!");
      return false;
    }
    return true;
  }

  function validateFieldLength() {
    if (userName.length < 3 || userName.length > 20) {
      displayAlert(
        "error",
        "Vartotojo vardui naudokite nuo 3 iki 20 simbolių!"
      );
      return false;
    } else if (email.length > 50) {
      displayAlert("error", "Elektroninio paštas negali viršyti 50 simbolių");
      return false;
    } else if (!email.includes("@")) {
      displayAlert(
        "error",
        "Įveskite egzistuojantį elektroninio pašto adresą!"
      );
      return false;
    } else if (password.length < 6 || password.length > 40) {
      displayAlert("error", "Slaptažodžiui naudokite nuo 6 iki 40 simbolių!");
      return false;
    }
    return true;
  }

  const handleRegistrationButtonClick = async () => {
    if (!validateEmptyFields()) {
      return;
    }

    if (!validateFieldLength()) {
      return;
    }

    const response = await registerNewUser(userName, email, password);
    if (response) {
      if (response.status === 200) {
        displayAlert("success", "Registracija sėkminga, galite prisijungti!");
        navigation.navigate("Login");
      } else if (response.status === 400) {
        // Custom error message from the server
        displayAlert("error", response.data.message);
      } else {
        // Dažniausiai validacija fail'ins ant emailo, bet gali būti ir kiti case'ai
        displayAlert(
          "error",
          "Patikrinkite, ar įvedėte korektišką elektroninio pašto adresą!"
        );
      }
    } else {
      // backend is down
      displayAlert("error", "No response from the server!");
    }
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
    bottomContainer: {
      flexDirection: "row",
      position: "absolute",
      bottom: -50,
      left: 0,
      right: 0,
      alignItems: "center",
    },
    avatar: {
      width: 0.4 * width,
      height: 0.4 * width,
      marginRight: -25,
      marginLeft: -5,
    },
  });

  return (
    <ImageBackground
      source={require("frontend/assets/backgrounds/LogIn_background-05.png")}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.pageStructure}>
        <Text style={styles.textBlock}>Naujojo rūšiuotojo anketa!</Text>
        <ImageBackground
          source={require("frontend/assets/icons/Login_Debeselis1.png")}
          style={styles.inputBackground}
        >
          <TextInput
            style={styles.textInput}
            placeholder="Vartotojo vardas"
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
            placeholder="Elektroninio pašto adresas"
            placeholderTextColor="#003f5c"
            onChangeText={(emailInput) => setEmail(emailInput)}
          />
        </ImageBackground>
        <ImageBackground
          source={require("frontend/assets/icons/Login_Debeselis1.png")}
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
          buttonText={"Registruotis"}
          onPressAction={handleRegistrationButtonClick}
          buttonColor="#70D66E"
        ></StyledButton>
        <View style={styles.bottomContainer}>
          <Image
            source={require("frontend/assets/avatars/Panda6-01.png")}
            style={[styles.avatar, { marginLeft: -25 }]}
          />
          <Image
            source={require("frontend/assets/avatars/Bear1-01.png")}
            style={[styles.avatar, { marginLeft: 10 }]}
          />
          <Image
            source={require("frontend/assets/avatars/Koala1-01.png")}
            style={styles.avatar}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
