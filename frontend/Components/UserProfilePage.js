import React from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

export default function Profile() {
  const styles = StyleSheet.create({
    textBlock: {
      width: "75%",
      backgroundColor: "#8C9A9E",
      textAlign: "center",
      color: "white",
      borderRadius: 25,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 10,
      marginTop: 30,
      fontWeight: "bold",
    },
    imageBlock: {
      width: "75%",
      maxHeight: 300,
      marginHorizontal: "auto",
      backgroundColor: "white",
      borderRadius: 32,
      marginTop: 40,
      alignSelf: "center",
    },
    image: {
      width: 250,
      height: 250,
      alignSelf: "center",
    },
  });

  return (
    <View style={styles.back}>
      <Text style={styles.textBlock}>Vėžliukas aštunkojis</Text>
      <View style={styles.imageBlock}>
        <Image
          source={require("frontend/assets/exampleUserImage.png")}
          style={styles.image}
        ></Image>
      </View>
      <Text style={styles.textBlock}>Turimi taškai</Text>
      <Text
        style={[
          styles.textBlock,
          { backgroundColor: "#F66B6B", marginTop: 10 },
        ]}
      >
        0t.
      </Text>
      <View>
        <Text style={styles.textBlock}>Medaliai</Text>
        <Image
          source={require("frontend/assets/badge.png")}
          style={{
            width: 100,
            height: 100,
            alignSelf: "center",
            marginTop: 30,
          }}
        ></Image>
      </View>
    </View>
  );
}
