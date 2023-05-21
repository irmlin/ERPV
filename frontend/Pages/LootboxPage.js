import { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Animated,
  Easing
} from "react-native";
import {
  addNewAvatarForUser,
  getUser,
  getUserAvatars,
  updateUserPoints,
} from "../Services/UserService";
import Icon from "react-native-vector-icons/Ionicons";
import { getAllAvatars } from "../Services/AvatarService";
import { GlobalAlertContext } from "../Contexts/GlobalAlertContext";
import { avatarImages } from "../data/AvatarImages";

export default function LootboxPage({ navigation }) {
  const [userAvatars, setUserAvatars] = useState([]);
  const [allAvatars, setAllAvatars] = useState([]);
  const [userData, setUserData] = useState({});
  const [animationState, setAnimationState] = useState({
    avatarImage: "",
    avatarVisible: false,
  });
  const scaleValue = useRef(new Animated.Value(0)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;
  const avatarPrice = 20;

  const { setAlertOpen, setAlertColor, setAlertText } =
    useContext(GlobalAlertContext);

  useEffect(() => {
    fetchAllAvatars();
    fetchUserAvatars();
    fetchUserData();
  }, []);

  useEffect(() => {
    if (!animationState.avatarVisible) {
      startRotationAnimation();
      return;
    } 
    resetRotationAnimation();
  }, [animationState.avatarVisible])

  const startAnimation = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const startRotationAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateValue, {
          toValue: -10,
          duration: 250,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(rotateValue, {
          toValue: 10,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(rotateValue, {
          toValue: 0,
          duration: 250,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ])
    ).start();
  };
  
  const resetAnimation = () => {
    setAnimationState({
      ...animationState,
      avatarVisible: false,
      avatarImage: "",
    });
    scaleValue.setValue(0);
  };

  const resetRotationAnimation = () => {
    rotateValue.setValue(0);
  };

  const scaleAnimation = {
    transform: [{ scale: scaleValue }],
  };

  const rotateStyle = {
    transform: [
      {
        rotate: rotateValue.interpolate({
          inputRange: [-10, 0, 10],
          outputRange: ["-10deg", "0deg", "10deg"]
        })
      }
    ]
  };

  function displayAlert(color, text) {
    setAlertColor(color);
    setAlertText(text);
    setAlertOpen(true);
  }

  const fetchUserAvatars = async () => {
    const response = await getUserAvatars();
    if (response && response.status == 200) {
      setUserAvatars(response.data["avatars"]);
    }
  };

  const fetchAllAvatars = async () => {
    const response = await getAllAvatars();
    if (response && response.status == 200) {
      setAllAvatars(response.data);
    }
  };

  const fetchUserData = async () => {
    const response = await getUser();
    if (response && response.status == 200) {
      setUserData(response.data);
    }
  };

  function chooseRandomAvatar() {
    if (!allAvatars) {
      return [];
    }
    const notOwnedAvatars = allAvatars.filter(
      (avatar) =>
        !userAvatars.some((userAvatar) => userAvatar["id"] === avatar["id"])
    );

    if (!notOwnedAvatars) {
      return [];
    }

    return notOwnedAvatars[Math.floor(Math.random() * notOwnedAvatars.length)];
  }

  const openLootbox = async () => {

    if (!userData) {
      return;
    }

    if (userData["totalAmountOfPoints"] < avatarPrice) {
      displayAlert("error", "Nepakanka taškų!");
      return;
    }

    const reducedPoints = userData["totalAmountOfPoints"] - avatarPrice;
    const randomAvatar = chooseRandomAvatar();
    if (!randomAvatar) {
      displayAlert("error", "Jau turi visus avatarus!");
      return;
    }

    const addAvatarResponse = await addNewAvatarForUser(randomAvatar["id"]);
    const updatePointsResponse = await updateUserPoints(reducedPoints);

    if (
      !(
        addAvatarResponse &&
        updatePointsResponse &&
        addAvatarResponse.status === 200 &&
        updatePointsResponse.status === 200
      )
    ) {
      displayAlert("error", "Įvyko klaida!");
      return;
    }

    setUserAvatars([...userAvatars, randomAvatar]);
    setUserData({...userData, totalAmountOfPoints: reducedPoints});

    // display lootbox animation
    setAnimationState({
      ...animationState,
      avatarVisible: true,
      avatarImage: randomAvatar.pictureName,
    });
    startAnimation();
    console.log(animationState);
  };

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    lootboxView: {
      width: "60%",
      height: "33%",
      position: "absolute",
      top: "20%",
    },
    fullSize: {
      width: "100%",
      height: "100%",
    },
    button: {
      backgroundColor: "#FAC643",
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginHorizontal: 5,
      marginVertical: 5,
      alignItems: "center",
      width: "80%",
      position: "absolute",
    },
    buttonText: {
      color: "white",
      fontSize: 30,
      fontWeight: "bold",
    },
    buttonContainer: {
      position: "absolute",
      bottom: "20%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    fullSize: {
      width: "100%",
      height: "100%",
    },
    animatedView: {
      position: "absolute",
      width: "50%",
      height: "50%",
      top: "30%",
    },
    restartButton: {
      width: "20%",
      height: "20%",
      position: "absolute",
      top: "85%", 
    }
  });

  return (
    <ImageBackground
      source={require("frontend/assets/backgrounds/background1.png")}
      resizeMode="cover"
      style={styles.fullSize}
    >
      <View style={styles.container}>
        <Animated.View style={[styles.lootboxView, rotateStyle]}>
          <ImageBackground
            source={require("frontend/assets/lootbox.png")}
            resizeMode="contain"
            style={styles.fullSize}
          />
        </Animated.View>

        {animationState.avatarVisible && (
          <Animated.View style={[styles.animatedView, scaleAnimation]}>
            <ImageBackground
              source={avatarImages[animationState.avatarImage]}
              resizeMode="contain"
              style={styles.fullSize}
            />
          </Animated.View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={openLootbox} disabled={animationState.avatarVisible ? true: false}>
            <Text style={styles.buttonText}>
              {animationState.avatarVisible
                ? "Avataras atrakintas!"
                : "Atidaryti už " + avatarPrice + " taškų"}
            </Text>
          </TouchableOpacity>
        </View>

        {animationState.avatarVisible && (
          <View style={styles.restartButton}>
            <TouchableOpacity onPress={resetAnimation}>
              <Icon name="reload" size={80} color="#717ED4"/>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}
