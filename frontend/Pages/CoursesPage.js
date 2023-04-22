import {
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function GamePage({ navigation }) {
  const { width, height } = Dimensions.get("window");
  const fontScale = Math.min(width, height) / 400;

  const styles = StyleSheet.create({
    textBlock: {
      width: "75%",
      textAlign: "center",
      color: "white",
      alignSelf: "center",
      marginTop: 35,
      marginBottom: 25,
      fontWeight: "bold",
      fontSize: 28 * fontScale,
      backgroundColor: "#FAC643",
      borderRadius: 15,
      borderWidth: 5,
      borderColor: "#FFFFFF",
    },
  });

  return (
    <ImageBackground
      source={require("frontend/assets/backgrounds/mokslo-kampelio-fonas.png")}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      <ScrollView>
        <Text style={styles.textBlock}>Visos pamokėlės</Text>
      </ScrollView>
    </ImageBackground>
  );
}
