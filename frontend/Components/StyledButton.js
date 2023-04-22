import React from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

export default function StyledButton({
  buttonText,
  onPressAction,
  buttonColor,
}) {
  const { width, height } = Dimensions.get("window");
  const fontScale = Math.min(width, height) / 400;

  const styles = StyleSheet.create({
    button: {
      flexDirection: "row",
      height: "7%",
      width: "80%",
      alignItems: "center",
      marginTop: "5%",
      elevation: 5,
      borderRadius: 15,
      borderColor: "white",
      borderWidth: 5,
      backgroundColor: buttonColor,
      justifyContent: "center",
    },
    text: {
      fontSize: 24 * fontScale,
      fontWeight: "bold",
      color: "white",
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.button}
      onPress={onPressAction}
    >
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
}
