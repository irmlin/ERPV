import React from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";

export default function SquareButton({ title, color, icon, onPressAction }) {
  const { width, height } = Dimensions.get("window");
  const fontScale = Math.min(width, height) / 400;
  const styles = StyleSheet.create({
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      width: width * 0.33,
      height: width * 0.33,
      backgroundColor: color,
      borderWidth: 10,
      borderColor: "#FFFFFF",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 25,
    },
    iconContainer: {
      width: width * 0.2,
      height: width * 0.2,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    titleStyle: {
      color: "black",
      fontWeight: "bold",
      fontSize: 18 * fontScale,
      textAlign: "center",
      backgroundColor: "white",
      borderRadius: 10,
      marginTop: 5,
      padding: 5,
    },
  });

  return (
    <View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPressAction}>
          <View style={styles.iconContainer}>
            <Image
              source={icon}
              resizeMode="contain"
              style={styles.iconContainer}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.titleStyle}>{title}</Text>
    </View>
  );
}
