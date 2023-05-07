import { View, Text, Button } from "react-native";
import Quiz from "../Components/Quiz";
import { useContext, useEffect } from "react";
import { BackgroundMusicContext } from "../Contexts/BackgroundMusicContext";

export default function QuizPage({navigation}) {

  const { backgroundMusic, toggleMainSong, setToggleMainSong } = useContext(BackgroundMusicContext);

  useEffect(() => {
    async function playBackgroundMusic() {
      try {
        await backgroundMusic.unloadAsync();
        await backgroundMusic.loadAsync(
          require("frontend/assets/music/funky.mp3")
        );
        await backgroundMusic.playAsync();
        backgroundMusic.setIsLoopingAsync(true);
      } catch (error) {
        console.log("Error playing background music:", error);
      }
    }
    playBackgroundMusic();
    return async () => {
      await backgroundMusic.unloadAsync();
      // this is necessary to change music back to main song
      setToggleMainSong(!toggleMainSong);
    };
  }, []);

  return (
    <View>
      <Quiz/>
    </View>
  );
}