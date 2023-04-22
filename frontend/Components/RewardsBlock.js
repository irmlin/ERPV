import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");
const fontScale = Math.min(width, height) / 400;

const RewardsBlock = ({ titleColor, awardsRank, color, awardsData }) => {
  const renderItem = ({ item }) => (
    <Image source={item.image} style={styles.awardImage} />
  );

  const styles = StyleSheet.create({
    container: {
      width: "80%",
      borderWidth: 10,
      borderColor: "#FFFFFF",
      borderRadius: 25,
      overflow: "hidden",
      backgroundColor: color,
      alignSelf: "center",
      flex: 1,
      marginBottom: 20,
    },
    textContainer: {
      alignItems: "center",
      padding: 10,
      marginBottom: -25,
    },
    title: {
      fontSize: 22 * fontScale,
      fontWeight: "bold",
      color: titleColor,
      marginBottom: 20,
      textAlign: "center",
    },
    awardImage: {
      width: width * 0.2,
      height: height * 0.15,
    },
    flatListContainer: {
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
      marginBottom: 15,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{awardsRank}</Text>
      </View>
      <FlatList
        data={awardsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

export default RewardsBlock;
