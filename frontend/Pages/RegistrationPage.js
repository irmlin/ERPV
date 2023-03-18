import React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text
} from "react-native";
import { authPageStyles } from "../Styles/AppStyles";
import { registerNewUser } from "../Services/AuthService";
import { GlobalAlertContext } from "../Contexts/GlobalAlertContext";


export default function RegistrationPage({ navigation }) {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
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
      displayAlert("error", "Vartotojo vardui naudokite nuo 3 iki 20 simbolių!");
      return false;
    } else if (email.length > 50) {
      displayAlert("error", "Elektroninio paštas negali viršyti 50 simbolių");
      return false;
    } else if (!email.includes('@')) {
      displayAlert("error", "Įveskite egzistuojantį elektroninio pašto adresą!");
      return false;
    } else if (password.length < 6 || password.length > 40) {
      displayAlert("error", "Slaptažodžiui naudokite nuo 6 iki 40 simbolių!")
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
        displayAlert("error", response.data.message)
      } else {
        // Dažniausiai validacija fail'ins ant emailo, bet gali būti ir kiti case'ai
        displayAlert("error", "Patikrinkite, ar įvedėte korektišką elektroninio pašto adresą!")
      }
    } else {
      // backend is down
      displayAlert("error", "No response from the server!")
    }
  };

  return (
    <View style={authPageStyles.parent}>
      <View style={authPageStyles.inputView}>
        <TextInput
          style={authPageStyles.textInput}
          placeholder="Vartotojo vardas"
          placeholderTextColor="#003f5c"
          onChangeText={(userNameInput) => setUserName(userNameInput)}
        />
      </View>
      <View style={authPageStyles.inputView}>
        <TextInput
          style={authPageStyles.textInput}
          placeholder="Elektroninio pašto adresas"
          placeholderTextColor="#003f5c"
          onChangeText={(emailInput) => setEmail(emailInput)}
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
      <TouchableOpacity style={authPageStyles.btn} onPress={handleRegistrationButtonClick}>
        <Text style={authPageStyles.btnText}>Registruotis</Text>
      </TouchableOpacity>
    </View>
  );
}