import { useState, createContext, useEffect } from "react";
import { Audio } from 'expo-av';

export const BackgroundMusicContext = createContext(null);

export function BackgroundMusicContextProvider({children}) {
  const [backgroundMusic, setBackgroundMusic] = useState(new Audio.Sound());
  const [toggleMainSong, setToggleMainSong] = useState(false);

  // main app music, will play everywhere, except in those pages, where
  // this logic is overwritten (see, for example, QuizPage.js)
  // useEffect(() => {
  //   async function playBackgroundMusic() {
  //     try {
  //       await backgroundMusic.loadAsync(
  //         require("frontend/assets/music/Fonine_muzika.mp3")
  //       );
  //       await backgroundMusic.playAsync();
  //       backgroundMusic.setIsLoopingAsync(true);
  //     } catch (error) {
  //       console.log("Error playing background music:", error);
  //     }
  //   }
  //   playBackgroundMusic();
  //   return async () => {
  //     await backgroundMusic.unloadAsync();
  //   };
  // }, [toggleMainSong]);

  return (
    <BackgroundMusicContext.Provider value={{ backgroundMusic, toggleMainSong, setToggleMainSong }}>
      {children}
    </BackgroundMusicContext.Provider>
  );
}