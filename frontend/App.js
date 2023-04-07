import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import { CameraContextProvider } from "./Contexts/CameraContext";
import AvatarPage from "./Pages/AvatarPage";
import QuizPage from "./Pages/QuizPage";
import ScanPage from "./Pages/ScanPage";
import GamePage from "./Pages/GamePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegistrationPage";
import { GlobalAlertContextProvider } from "./Contexts/GlobalAlertContext";
import Alert from "./Components/Alert";

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CameraContextProvider>
      <GlobalAlertContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              title: "Vėžliukai rūšiuoja",
              headerStyle: {
                backgroundColor: "#2e7698",
              },
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 30,
              },
            }}
          >
            {/* <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} /> */}
            <Stack.Screen name="Home" component={HomePage} options={{ headerBackVisible: false }} />
            <Stack.Screen name="Profile" component={ProfilePage} />
            <Stack.Screen name="Avatar" component={AvatarPage} />
            <Stack.Screen name="Scan" component={ScanPage} />
            <Stack.Screen name="Quiz" component={QuizPage} />
            <Stack.Screen name="Game" component={GamePage} />
          </Stack.Navigator>
        </NavigationContainer>
        <Alert duration={4000}/>
      </GlobalAlertContextProvider>
    </CameraContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
