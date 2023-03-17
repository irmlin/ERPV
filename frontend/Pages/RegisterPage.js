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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterButtonClick = async () => {
    const response = await registerNewUser(userName, email, password);
    if (response.status === 200) {
      
    } else {

    }
    navigation.navigate("Login");
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
      <TouchableOpacity style={authPageStyles.btn} onPress={handleRegisterButtonClick}>
        <Text style={authPageStyles.btnText}>Registruotis</Text>
      </TouchableOpacity>
    </View>
  );
}