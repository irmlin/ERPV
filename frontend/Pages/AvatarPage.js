import { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Swiper from 'react-native-swiper';

export default function AvatarPage({navigation}) {

  const images = [
    require('../assets/1.png'),
    require('../assets/2.png'),
    require('../assets/3.png'),
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const onSwipeImageChange = (index) => {
    setCurrentImageIndex(index)
  }

  return (
    <View style={styles.container}>
      <Swiper
        showsButtons={true}
        loop={false}
        index={currentImageIndex}
        onIndexChanged={(index) => onSwipeImageChange(index)}
        showsPagination={false}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </Swiper>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Atrakinti</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Naudoti</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#6DD8E7',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    alignItems: 'center',
    width: "50%",
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold'
  },
});