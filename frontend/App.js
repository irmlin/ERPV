import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';
import AboutPage from './Pages/AboutPage';
import CameraComponent from './Components/CameraComponent';
import {CameraContextProvider} from './Contexts/CameraContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CameraContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomePage}/>
          <Stack.Screen name="Profile" component={ProfilePage} />
          <Stack.Screen name="About" component={AboutPage} />
          <Stack.Screen name="Scan a package" component={CameraComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    </CameraContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
