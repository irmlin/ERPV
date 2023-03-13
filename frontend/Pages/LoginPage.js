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
import StyledButton from "../Components/StyledButton";


export default function LoginPage() {

  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginButtonClick = () => {
    navigation.navigate("Home");
  };

  const styles = StyleSheet.create({
    parent: {
      width: "100%",
      height: "100%",
      backgroundColor: "#add8e6",
      margin: 0,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputView: {
      backgroundColor: "#FFFFFF",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },
    textInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
      fontStyle: "italic"
    },
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#3a9fbf",
    },
    loginText: {
      fontWeight: "bold",
    }
  });

  return (
    <View style={styles.parent}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Vartotojo Vardas"
          placeholderTextColor="#003f5c"
          onChangeText={(userNameInput) => setUserName(userNameInput)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Slaptažodis"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(passwordInput) => setPassword(passwordInput)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLoginButtonClick}>
        <Text style={styles.loginText}>Prisijungti</Text>
      </TouchableOpacity>
    </View>
  );
}