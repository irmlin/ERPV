import {
  Modal,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ScannerGuidePopup({ open, onClose }) {
  const styles = StyleSheet.create({
    container: {
      width: "90%",
      height: "70%",
      backgroundColor: "#FAC643",
      position: "absolute",
      top: "15%",
      bottom: "15%",
      left: "5%",
      right: "5%",
      borderRadius: 50,
      borderWidth: 10,
      borderColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    scrollContent: {
      justifyContent: "center",
      alignItems: "center",
    },
    titleContainer: {
      position: "absolute",
      top: 10,
      flexDirection: "row"
    },
    titleText: {
      fontWeight: "bold",
      fontSize: 30,
    },
    image: { width: 300, height: 400 },
    imageContainer: {
      marginVertical: 20,
    },
    imagesColumn: {
      marginTop: 60,
    },
    exitButton: {
      marginLeft: 10,
      marginTop: 5
    },
    infoBoxSuccess: {
      position: "absolute",
      bottom: "15%",
      right: "0%",
      backgroundColor: "green",
      borderRadius: 20,
      width: "55%",
      height: "15%",
      justifyContent: "center",
      alignItems: "center",
    },
    infoBoxFailure: {
      position: "absolute",
      bottom: "15%",
      right: "3%",
      backgroundColor: "red",
      borderRadius: 20,
      width: "55%",
      height: "15%",
      justifyContent: "center",
      alignItems: "center",
    },
    infoBoxText: {
      fontWeight: "bold",
      fontSize: 20,
      color: "white",
    },
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={onClose}
    >
      <View style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', width: "100%", height: "100%"}}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Kaip fotografuoti?</Text>
          <TouchableOpacity onPress={onClose} style={styles.exitButton}>
            <Icon size={30} color="black" name="window-close" />
          </TouchableOpacity>
        </View>

        <View style={styles.imagesColumn}>
          <ScrollView>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={require("frontend/assets/scanner_tutorial/good.jpg")}
                resizeMode={"contain"}
                style={styles.image}
              />
              <View style={styles.infoBoxSuccess}>
                <Text style={styles.infoBoxText}>Puiku!</Text>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={require("frontend/assets/scanner_tutorial/too_far.jpg")}
                resizeMode={"contain"}
                style={styles.image}
              />
              <View style={styles.infoBoxFailure}>
                <Text style={styles.infoBoxText}>Per toli!</Text>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={require("frontend/assets/scanner_tutorial/blurry.jpg")}
                resizeMode={"contain"}
                style={styles.image}
              />
              <View style={styles.infoBoxFailure}>
                <Text style={styles.infoBoxText}>Sufokusuok!</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      </View>
    </Modal>
  );
}
