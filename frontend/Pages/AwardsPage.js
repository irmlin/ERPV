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

import { useNavigation } from "@react-navigation/native";
import RewardsBlock from "frontend/Components/RewardsBlock.js";

export default function AwardsPage() {
  const { width, height } = Dimensions.get("window");
  const fontScale = Math.min(width, height) / 400;

  const styles = StyleSheet.create({
    textBlock: {
      width: "75%",
      textAlign: "center",
      color: "white",
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 25,
      marginBottom: 25,
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
      marginTop: 50,
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
      source={require("frontend/assets/backgrounds/awardsPageBackground.png")}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      <ScrollView>
        <Text style={styles.textBlock}>Apdovanojimai</Text>
        <RewardsBlock
          color="#FFD998"
          awardsRank={"Rūšiavimo ekspertas"}
          titleColor="#ED5B01"
          awardsData={[
            { id: 1, image: require("frontend/assets/icons/LockedAward.png") },
            { id: 2, image: require("frontend/assets/icons/LockedAward.png") },
            { id: 3, image: require("frontend/assets/icons/LockedAward.png") },
            { id: 4, image: require("frontend/assets/icons/LockedAward.png") },
            { id: 5, image: require("frontend/assets/icons/LockedAward.png") },
            { id: 6, image: require("frontend/assets/icons/LockedAward.png") },
            { id: 7, image: require("frontend/assets/icons/LockedAward.png") },
            { id: 8, image: require("frontend/assets/icons/LockedAward.png") },
          ]}
        ></RewardsBlock>
        <RewardsBlock
          color="#C2C6D5"
          awardsRank={"Pradedantysis rūšiuotojas"}
          titleColor="black"
          awardsData={[
            { id: 1, image: require("frontend/assets/icons/LockedAward.png") },
            { id: 2, image: require("frontend/assets/icons/LockedAward.png") },
            { id: 3, image: require("frontend/assets/icons/LockedAward.png") },
            { id: 4, image: require("frontend/assets/icons/LockedAward.png") },
          ]}
        ></RewardsBlock>
        <RewardsBlock
          color="#C1A4FA"
          awardsRank={"Specialūs apdovanojimai"}
          titleColor="white"
          awardsData={[
            { id: 1, image: require("frontend/assets/icons/MysteryBadge.png") },
            { id: 2, image: require("frontend/assets/icons/MysteryBadge.png") },
            { id: 3, image: require("frontend/assets/icons/MysteryBadge.png") },
            { id: 4, image: require("frontend/assets/icons/MysteryBadge.png") },
            { id: 5, image: require("frontend/assets/icons/MysteryBadge.png") },
            { id: 6, image: require("frontend/assets/icons/MysteryBadge.png") },
          ]}
        ></RewardsBlock>
      </ScrollView>
    </ImageBackground>
  );
}
