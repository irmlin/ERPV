import React from "react";
import { useState, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { authPageStyles } from "../Styles/AppStyles";
import { login } from "../Services/AuthService";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GlobalAlertContext } from "../Contexts/GlobalAlertContext";


export default function LoginPage() {

  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAlertOpen, setAlertColor, setAlertText } = useContext(GlobalAlertContext);

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
        const jwtCookie = response.headers.get('Set-Cookie');
          if (jwtCookie) {
            const cookieValue = jwtCookie[0].split(';')[0]
            await AsyncStorage.setItem('JWT_COOKIE', cookieValue);
            navigation.navigate("Home");
          } else {
            console.log('No cookie received in response headers.');
          }
      } else if (response.status === 400) {
        displayAlert("error", response.data.message);
      } else {
        displayAlert("error", "Neteisingi vartotojo duomenys!");
      }
    } else {
      displayAlert("error", "No response from the server!")
    }
  };

  const handleRegistrationButtonClick =  () => {
    navigation.navigate("Register");
  };

  return (
    <View style={authPageStyles.parent}>
      <View style={authPageStyles.inputView}>
        <TextInput
          style={authPageStyles.textInput}
          placeholder="Vartotojo Vardas"
          placeholderTextColor="#003f5c"
          onChangeText={(userNameInput) => setUserName(userNameInput)}
        />
      </View>
      <View style={authPageStyles.inputView}>
        <TextInput
          style={authPageStyles.textInput}
          placeholder="Slaptažodis"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(passwordInput) => setPassword(passwordInput)}
        />
      </View>
      <TouchableOpacity onPress={handleRegistrationButtonClick}>
        <Text style={[authPageStyles.btnText, {textDecorationLine: 'underline'}]}>Naujas vartotojas? Registruokis čia</Text>
      </TouchableOpacity>
      <TouchableOpacity style={authPageStyles.btn} onPress={handleLoginButtonClick}>
        <Text style={authPageStyles.btnText}>Prisijungti</Text>
      </TouchableOpacity>
    </View>
  );
}