import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
} from "react-native";

import SquareButton from "frontend/Components/SquareButton.js";
import UserStatistics from "frontend/Components/UserStatsTable.js";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const handleAvatarButtonClick = () => {
    navigation.navigate("Avatar");
  };

  const handleAwardsButtonClick = () => {
    navigation.navigate("Awards");
  };

  const { width, height } = Dimensions.get("window");
  const fontScale = Math.min(width, height) / 400;

  const styles = StyleSheet.create({
    textBlock: {
      width: "75%",
      textAlign: "center",
      color: "#2B2D42",
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 25,
      fontWeight: "bold",
      fontSize: 28 * fontScale,
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      paddingHorizontal: 10,
      marginTop: 10,
    },
    bottomContainer: {
      flexDirection: "row",
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "20%",
      borderTopWidth: 15,
      borderTopColor: "white",
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      backgroundColor: "#FAC643",
      padding: 10,
      alignItems: "center",
    },
    profilePic: {
      width: 0.4 * width,
      height: 0.4 * width,
      borderRadius: 25,
      marginRight: width * 0.03,
      marginLeft: width * 0.025,
      marginTop: width * 0.15,
    },
    username: {
      fontWeight: "bold",
      fontSize: 20 * fontScale,
      color: "#2B2D42",
    },
    points: {
      fontSize: 16 * fontScale,
      color: "#a70b0b",
    },
  });

  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("frontend/assets/backgrounds/background1.png")}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      <ScrollView>
        <View style={[styles.rowContainer, { marginTop: height * 0.12 }]}>
          <SquareButton
            onPressAction={handleAvatarButtonClick}
            title={"Avatarai"}
            color="#70D66E"
            icon={require("frontend/assets/icons/avataru_ikona-01.png")}
          />
          <SquareButton
            onPressAction={handleAwardsButtonClick}
            title={"Medaliai"}
            color="#A885ED"
            icon={require("frontend/assets/badge.png")}
          />
        </View>
        <Text style={styles.textBlock}>Statistika</Text>
        <UserStatistics></UserStatistics>
        <View style={{ height: height * 0.23 }}></View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Image
          source={require("frontend/assets/avatars/Dog1-01.png")}
          style={styles.profilePic}
        />
        <View style={styles.userInfoContainer}>
          <Text style={styles.username}>Vėžliukas aštuonkojis</Text>
          <Text style={styles.points}>
            Turimi taškai: <Text style={{ fontWeight: "bold" }}>184t.</Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
