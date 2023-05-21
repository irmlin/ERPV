import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Swiper from "react-native-swiper";
import { fetchUserJSON, fetchUserAvatarsJSON } from "../data/DBUserData";
import { putUserAvatar } from "../data/DBUserData";
import ImageImport from "../data/ImageImport";

export default function AvatarPage() {
  const [userData, setUserData] = useState([]);
  const [userAvatarData, setUserAvatarData] = useState([]);
  const [images, setImages] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchUserAvatarsJSON()
      .then(data => {
        setUserAvatarData(data);
        getImages(data);
      })
      .catch(error => console.error(error));
  }, []);

  const getImages = async (userData) => {
    let img = [];
    userData["avatars"].forEach(el => {
      const pictureName = el["pictureName"];
      const imageName = pictureName.toLowerCase().split("-")[0];
      const image = {
        picture: ImageImport[imageName],
        id: el["id"]
      };
      if (image.picture !== undefined) {
        img.push(image);
      } else {
        console.warn(`Image not found for pictureName: ${pictureName}`);
      }
    });
    setImages(img);
  };

  const onSwipeImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    fetchUserJSON()
      .then(data => setUserData(data))
      .catch(error => console.error(error));
  }, []);

  const updateAvatar = (avatarId) => {
    putUserAvatar(avatarId);
    setUserData(prevUserData => ({ ...prevUserData, avatarId }));
  };

  return (
    <ImageBackground
      source={require("frontend/assets/backgrounds/avatarsBackground.png")}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      {images ? (
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
                <Image source={image.picture} style={styles.image} />
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={
                      userData["avatarId"] === image.id
                        ? styles.unclickableButton
                        : styles.button
                    }
                    onPress={() => updateAvatar(image.id)}
                    disabled={userData["avatarId"] === image.id}
                  >
                    <Text style={styles.buttonText}>Naudoti</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </Swiper>
        </View>
      ) : (
        <></>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#6DD8E7",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    alignItems: "center",
    width: "50%",
  },
  unclickableButton: {
    backgroundColor: "#808080",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    alignItems: "center",
    width: "50%",
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});
