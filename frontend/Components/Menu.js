import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Menu() {
  const navigation = useNavigation(); 

  const handleProfileButtonClick = () => {
    navigation.navigate('Profile');
  };

  const handleAboutButtonClick = () => {
    navigation.navigate('About');
  };

  return (
    <View>
      <Button title="Profile" onPress={handleProfileButtonClick} />
      <Button title="About" onPress={handleAboutButtonClick} />
      <Button title="Scan Package" onPress={() => {}} />
      <Button title="Quiz" onPress={() => {}} />
    </View>
  );
}