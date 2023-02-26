import React from 'react';
import { View, Button, Alert } from 'react-native';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {Camera} from 'expo-camera'
import {CameraContext} from '../Contexts/CameraContext';


export default function Menu() {
  const navigation = useNavigation(); 
  const { cameraStarted, setCameraStarted } = useContext(CameraContext);

  const handleProfileButtonClick = () => {
    navigation.navigate('Profile');
  };

  const handleAboutButtonClick = () => {
    navigation.navigate('About');
  };

  const handleStartCamera = async () => {
    const status = await Camera.requestCameraPermissionsAsync()
    if (status.status === 'granted') {
      navigation.navigate('Scan a package');
      setCameraStarted(true)
    } else {
      Alert.alert('Camera access denied')
    }
  }

  return (
    <View>
      <Button title="Profile" onPress={handleProfileButtonClick} />
      <Button title="About" onPress={handleAboutButtonClick} />
      <Button title="Scan a Package" onPress={handleStartCamera} />
      <Button title="Quiz" onPress={() => {}} />
    </View>
  );
}