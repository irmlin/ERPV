import React, { useEffect, useContext } from "react";
import {
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { BackgroundMusicContext } from "frontend/Contexts/BackgroundMusicContext.js";

export default function CoursesPage1({ navigation }) {
  const { width, height } = Dimensions.get("window");
  const fontScale = Math.min(width, height) / 400;

  const handleRecyclingCoursesButtonClick = () => {
    navigation.navigate("Page3");
  };

  const styles = StyleSheet.create({
    textBlock: {
      width: "80%",
      textAlign: "center",
      color: "white",
      alignSelf: "center",
      marginTop: 75,
      marginBottom: 25,
      fontWeight: "bold",
      fontSize: 28 * fontScale,
      backgroundColor: "#FAC643",
      borderRadius: 15,
      borderWidth: 5,
      borderColor: "#FFFFFF",
    },
    container: {
      width: "80%",
      height: "80%",
      borderWidth: 10,
      borderColor: "#FFFFFF",
      borderRadius: 25,
      overflow: "hidden",
      backgroundColor: "#B0E1E8",
      alignSelf: "center",
      flex: 1,
      marginBottom: 20,
      alignItems: "center",
      justifyContent: "center", // Added to center align content vertically
      paddingHorizontal: "10%", // Added horizontal padding/margin
    },
    bottomImage: {
      position: "absolute",
      width: 0.6 * width,
      height: 0.6 * width,
      marginLeft: -90,
    },
    bottomContainer: {
      flexDirection: "row",
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "20%",
      alignItems: "center",
    },
    centeredText: {
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
    },
    button: {
      backgroundColor: "#4CBB17",
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 15,
      alignSelf: "center",
      marginTop: 16,
      marginBottom: 16,
      width: "60%",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
  });

  const { backgroundMusic, toggleMainSong, setToggleMainSong } = useContext(
    BackgroundMusicContext
  );
  useEffect(() => {
    async function playBackgroundMusic() {
      try {
        await backgroundMusic.unloadAsync();
        await backgroundMusic.loadAsync(
          require("frontend/assets/music/Character_voiceover/audio2.mp3")
        );
        await backgroundMusic.playAsync();
        backgroundMusic.setIsLoopingAsync(false); // Set looping to false
      } catch (error) {
        console.log("Error playing background music:", error);
      }
    }

    playBackgroundMusic();

    return async () => {
      await backgroundMusic.unloadAsync();
      setToggleMainSong(!toggleMainSong);
    };
  }, []);

  return (
    <ImageBackground
      source={require("frontend/assets/backgrounds/mokslo-kampelio-fonas.png")}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      <ScrollView>
        <Text style={styles.textBlock}>Kaip žymimos rūšiuojamos pakuotės?</Text>
        <View style={styles.container}>
          <Image
            source={require("frontend/assets/backgrounds/pamokelesIliustracija.jpg")}
            style={{
              width: "100%",
              height: 150,
              marginTop: 25,
              marginBottom: 25,
            }}
          />
          <Text style={styles.centeredText}>
            Jeigu pakuotė yra rūšiuojama, ant pakuotės bus galima rasti
            trikampėlį su tam tikru numeriu, tad norėdamas sužinoti kas tai per
            pakuotė, panaudok mūsų skenerį ir mes tau su malonumu padėsime
            tinkamai surūšiuoti nežinomas pakuotes
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={handleRecyclingCoursesButtonClick}
          >
            <Text style={styles.buttonText}>Toliau</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Image
          source={require("frontend/assets/Paul1-01.png")}
          style={styles.bottomImage}
        />
      </View>
    </ImageBackground>
  );
}
