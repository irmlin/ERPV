import {
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LESSON_TYPES } from "../data/CoursesEnums";

export default function LessonBlockComponent({
  title,
  durationInMinutes,
  lessonType,
  thumbnailImage,
  award,
}) {
  const { width, height } = Dimensions.get("window");
  const fontScale = Math.min(width, height) / 400;

  const onStartLessonButtonPress = () => {};

  const styles = StyleSheet.create({
    container: {
      width: "80%",
      borderWidth: 10,
      borderColor: "#FFFFFF",
      borderRadius: 25,
      overflow: "hidden",
      backgroundColor: "white",
      alignSelf: "center",
      flex: 1,
      marginBottom: 20,
      padding: 10,
    },
    iconRow: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center"
    },
    title: {
      fontSize: 20 * fontScale,
      fontWeight: "bold",
      color: "black",
      marginBottom: 20,
      textAlign: "center",
    },
    thumbnail: {
      width: width * 0.7,
      height: height * 0.2,
      resizeMode: "cover",
      marginBottom: 10,
    },
    iconWithText: {
      width: width * 0.12,
      height: width * 0.12,
      marginBottom: 5,
    },
    iconWithTextContainer: {
      alignItems: "center",
      width: "33%"
    },
    textUnderIcon: {
      fontSize: 12 * fontScale,
      fontWeight: "bold",
      textAlign: "center",
    },
    iconWithoutText: {
      width: width * 0.25,
      height: width * 0.25
    },
    button: {
      backgroundColor: "#4CBB17",
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 15,
      alignSelf: "center",
      marginTop: 16,
      width: "40%"
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center"
    },
  });

  return (
    <View style={styles.container}>
      <Image source={thumbnailImage} style={styles.thumbnail} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconRow}>
        <View style={styles.iconWithTextContainer}>
          <Image
            source={require("frontend/assets/icons/clock-icon.png")}
            style={styles.iconWithText}
          />
          <Text style={styles.textUnderIcon}>
            {durationInMinutes} min. trukmė
          </Text>
        </View>
        <Image source={award["image"]} style={styles.iconWithoutText} />
        <View style={styles.iconWithTextContainer}>
          <Image
            source={
              lessonType === LESSON_TYPES.VIDEO
                ? require("frontend/assets/icons/video-icon.png")
                : require("frontend/assets/icons/book-icon.png")
            }
            style={styles.iconWithText}
          />
          <Text style={styles.textUnderIcon}>
            {lessonType === LESSON_TYPES.VIDEO
              ? "Vaizdo įrašas"
              : lessonType === LESSON_TYPES.READ
              ? "Skaityti"
              : "Kita"}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={onStartLessonButtonPress}
      >
        <Text style={styles.buttonText}>Pradėti</Text>
      </TouchableOpacity>
    </View>
  );
}
