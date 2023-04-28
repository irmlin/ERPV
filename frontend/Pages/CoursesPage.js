import {
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import LessonBlockComponent from "../Components/LessonBlockComponent";
import { LESSON_TYPES } from "../data/CoursesEnums";
import { AWARDS } from "../data/AwardEnums";

export default function CoursesPage({ navigation }) {
  const { width, height } = Dimensions.get("window");
  const fontScale = Math.min(width, height) / 400;

  const styles = StyleSheet.create({
    textBlock: {
      width: "75%",
      textAlign: "center",
      color: "white",
      alignSelf: "center",
      marginTop: 35,
      marginBottom: 25,
      fontWeight: "bold",
      fontSize: 28 * fontScale,
      backgroundColor: "#FAC643",
      borderRadius: 15,
      borderWidth: 5,
      borderColor: "#FFFFFF",
    },
  });

  return (
    <ImageBackground
      source={require("frontend/assets/backgrounds/mokslo-kampelio-fonas.png")}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      <ScrollView>
        <Text style={styles.textBlock}>Visos pamokėlės</Text>
        <LessonBlockComponent
          title={"Kaip perdirbamas popierius?"}
          durationInMinutes={5}
          lessonType={LESSON_TYPES.READ}
          award={AWARDS.RECYCLING_NERD}
          thumbnailImage={require("frontend/assets/thumbnail-example.png")}
        />
        <LessonBlockComponent
          title={"Kaip perdirbamas plastikas?"}
          durationInMinutes={50}
          lessonType={LESSON_TYPES.VIDEO}
          award={AWARDS.RECYCLING_NEWBIE}
          thumbnailImage={require("frontend/assets/thumbnail-example.png")}
        />
      </ScrollView>
    </ImageBackground>
  );
}
