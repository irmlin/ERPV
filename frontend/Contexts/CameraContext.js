import { useState, createContext } from "react";

export const CameraContext = createContext(null);

export function CameraContextProvider({children}) {
  const[cameraStarted, setCameraStarted] = useState(false);

  return (
    <CameraContext.Provider value={{ cameraStarted, setCameraStarted }}>
      {children}
    </CameraContext.Provider>
  );
}