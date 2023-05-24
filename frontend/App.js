import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import { CameraContextProvider } from "./Contexts/CameraContext";
import AvatarPage from "./Pages/AvatarPage";
import QuizPage from "./Pages/QuizPage";
import ScanPage from "./Pages/ScanPage";
import CoursesPage from "./Pages/CoursesPage";
import AwardsPage from "./Pages/AwardsPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegistrationPage";

//Courses
import RecyclingCoursePage1 from "./Pages/CoursesPages/RecyclingCourse1/RecyclingPage1";
import RecyclingCoursePage2 from "./Pages/CoursesPages/RecyclingCourse1/RecyclingPage2";
import RecyclingCoursePage3 from "./Pages/CoursesPages/RecyclingCourse1/RecyclingPage3";
import RecyclingCoursePage4 from "./Pages/CoursesPages/RecyclingCourse1/RecyclingPage4";
import RecyclingCoursePage5 from "./Pages/CoursesPages/RecyclingCourse1/RecyclingPage5";

import { GlobalAlertContextProvider } from "./Contexts/GlobalAlertContext";
import { BackgroundMusicContextProvider } from "./Contexts/BackgroundMusicContext";
import Alert from "./Components/Alert";

import { LogBox } from "react-native";
import LootboxPage from "./Pages/LootboxPage";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

const cloudImage = require("frontend/assets/icons/grizti_atgal-01.png");

const Stack = createNativeStackNavigator();

function CloudNav() {
  const nav = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => nav.goBack()}>
        <View style={styles.cloudContainer}>
          <Image source={cloudImage} style={styles.cloudImage} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <CameraContextProvider>
      <GlobalAlertContextProvider>
        <BackgroundMusicContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                header: () => <CloudNav />,
                headerShown: true,
              }}
            >
              <Stack.Screen
                name="Login"
                component={LoginPage}
                options={{
                  headerBackVisible: false,
                  headerShown: false,
                }}
              />
              <Stack.Screen name="Register" component={RegisterPage} />
              <Stack.Screen
                name="Home"
                component={HomePage}
                options={{
                  headerBackVisible: false,
                  headerShown: false,
                }}
              />
              <Stack.Screen name="Profile" component={ProfilePage} />
              <Stack.Screen name="Avatar" component={AvatarPage} />
              <Stack.Screen
                name="Scan"
                component={ScanPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Quiz" component={QuizPage} />
              <Stack.Screen name="Courses" component={CoursesPage} />
              <Stack.Screen name="Awards" component={AwardsPage} />
              <Stack.Screen name="Lootbox" component={LootboxPage} />
              <Stack.Screen name="Page1" component={RecyclingCoursePage1} />
              <Stack.Screen name="Page2" component={RecyclingCoursePage2} />
              <Stack.Screen name="Page3" component={RecyclingCoursePage3} />
              <Stack.Screen name="Page4" component={RecyclingCoursePage4} />
              <Stack.Screen name="Page5" component={RecyclingCoursePage5} />
            </Stack.Navigator>
          </NavigationContainer>
          <Alert duration={4000} />
        </BackgroundMusicContextProvider>
      </GlobalAlertContextProvider>
    </CameraContextProvider>
  );
}
const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "transparent",
    position: "relative",
  },
  cloudContainer: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  cloudImage: {
    height: 80,
    width: 80,
  },
});
