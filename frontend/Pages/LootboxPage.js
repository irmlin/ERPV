import { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import {
  addNewAvatarForUser,
  getUser,
  getUserAvatars,
  updateUserPoints,
} from "../Services/UserService";
import { getAllAvatars } from "../Services/AvatarService";
import { GlobalAlertContext } from "../Contexts/GlobalAlertContext";

export default function LootboxPage({ navigation }) {
  const [userAvatars, setUserAvatars] = useState([]);
  const [allAvatars, setAllAvatars] = useState([]);
  const [userData, setUserData] = useState({});
  const avatarPrice = 20;

  const { setAlertOpen, setAlertColor, setAlertText } =
    useContext(GlobalAlertContext);

  useEffect(() => {
    fetchAllAvatars();
    fetchUserAvatars();
    fetchUserData();
  }, []);

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

  const openLootbox = async (e) => {
    e.preventDefault();

    if (!userData) {
      return;
    }

    if (!(userData["totalAmountOfPoints"] < avatarPrice)) {
      displayAlert("error", "Nepakanka taškų!");
    }

    const reducedPoints = userData["totalAmountOfPoints"] - avatarPrice;
    const randomAvatar = chooseRandomAvatar();
    if (!randomAvatar) {
      displayAlert("error", "Jau turi visus avatarus!");
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
    }

    // display lootbox animation
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
      borderColor: "red",
      borderWidth: 2,
      position: "absolute",
      top: "20%"
    },
    fullSize: {
      width: "100%", height: "100%"
    }
  });

  return (
    <ImageBackground
      source={require("frontend/assets/backgrounds/background1.png")}
      resizeMode="cover"
      style={styles.fullSize}
    >
      <View style={styles.container}>
        <View style={styles.lootboxView}>
          <ImageBackground
            source={require("frontend/assets/lootbox.png")}
            resizeMode="contain"
            style={styles.fullSize}
          />
        </View>
        <View></View>
      </View>
    </ImageBackground>
  );
}
