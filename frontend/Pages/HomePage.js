import { View, Text, Button } from "react-native";
import Menu from "../Components/Menu";
import CameraComponent from "../Components/CameraComponent";

export default function HomePage({navigation}) {

  return (
    <View>
      <Menu/>
      <CameraComponent/>
    </View>
  );
}