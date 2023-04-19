import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function StyledButton({buttonText, onPressAction}) {

  const styles = StyleSheet.create({
    button: {
      flexDirection: "row",
      height: "13%",
      width: "60%",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "10%",
      marginLeft: "20%",
      elevation: 10,
      borderRadius: 17,
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      style={styles.button}
      onPress={onPressAction}
    >
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

