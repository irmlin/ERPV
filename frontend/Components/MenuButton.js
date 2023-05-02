import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MenuButton({
  iconImage,
  text,
  backgroundColor,
  onClick,
}) {
  const stylesb = StyleSheet.create({
    button: {
      flexDirection: "row",
      height: "8%",
      width: "70%",
      alignItems: "center",
      marginTop: "5%",
      marginHorizontal: "15%",
      elevation: 10,
      borderRadius: 15,
      borderColor: "white",
      borderWidth: 5,
      justifyContent: "center",
      overflow: "hidden"
    },
    text: {
      fontSize: 25,
      fontWeight: "bold",
      color: "white",
    },
    buttonImageIconStyle: {
      height: "70%",
      width: "100%",
      resizeMode: "contain",
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      style={[stylesb.button, { backgroundColor: backgroundColor }]}
      onPress={onClick}
    >
      <View style={{width: "20%"}}>
        <Image source={iconImage} style={stylesb.buttonImageIconStyle} />
      </View>
      <View style={{width: "70%",  alignItems: "center"}}>
        <Text style={stylesb.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
