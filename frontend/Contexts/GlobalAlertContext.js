import { useState, createContext } from "react";

export const GlobalAlertContext = createContext(null);

export function GlobalAlertContextProvider({children}) {
  const [alertOpen, setAlertOpen] = useState(false);
  // success - green
  // error - red
  // info - black
  const [alertColor, setAlertColor] = useState("success");
  const [alertText, setAlertText] = useState("");

  return (
    <GlobalAlertContext.Provider value={{ alertOpen, setAlertOpen, alertColor, setAlertColor, alertText, setAlertText }}>
      {children}
    </GlobalAlertContext.Provider>
  );
}