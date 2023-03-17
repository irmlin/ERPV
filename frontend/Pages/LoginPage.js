import React from "react";
import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { authPageStyles } from "../Styles/AppStyles";


export default function LoginPage() {

  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginButtonClick = () => {
    navigation.navigate("Home");
  };

  const handleRegisterButtonClick = () => {
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
      <TouchableOpacity style={authPageStyles.btn} onPress={handleLoginButtonClick}>
        <Text style={authPageStyles.btnText}>Prisijungti</Text>
      </TouchableOpacity>
      <TouchableOpacity style={authPageStyles.btn} onPress={handleRegisterButtonClick}>
        <Text style={authPageStyles.btnText}>Naujas vartotojas? Registruokis čia</Text>
      </TouchableOpacity>
    </View>
  );
}