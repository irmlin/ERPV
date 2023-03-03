import React from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Menu() {
  const navigation = useNavigation(); 

  const handleProfileButtonClick = () => {
    navigation.navigate('Profile');
  };

  const handleAvatarButtonClick = () => {
    navigation.navigate('Avatar');
  };

  const handleQuizButtonClick = () => {
    navigation.navigate('Quiz');
  };

  const handleScanButtonClick = () => {
    navigation.navigate('Scan');
  };

  /*const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });*/

  const styles = StyleSheet.create({
    parent: {
        width: 600,
        height: 1000,
        backgroundColor: '#add8e6',
        margin: 0,
    },
    button: {
        flexDirection: 'row', 
        height: 80, 
        width: 300,
        backgroundColor: '#3a9fbf',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        marginLeft: 150,
        elevation: 10,
        borderRadius: 15,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})

  return (
    <View style={styles.parent}>
      <TouchableOpacity activeOpacity={0.95} style={styles.button} onPress={handleProfileButtonClick}>
      <Text style={styles.text}>Profilis </Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.95} style={styles.button} onPress={handleAvatarButtonClick}>
      <Text style={styles.text}>Avatarai </Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.95} style={styles.button} onPress={handleQuizButtonClick}>
      <Text style={styles.text}>Klausimynas </Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.95} style={styles.button} onPress={handleScanButtonClick}>
      <Text style={styles.text}>Pakuočių skenavimas </Text>
      </TouchableOpacity>

    </View>
  );
}