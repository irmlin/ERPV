import { View, Text } from "react-native";
import {CameraContext} from '../Contexts/CameraContext';
import { useContext } from 'react';
import CameraComponent from '../Components/CameraComponent';

export default function ScanPage({navigation}) {

  // probably get some data later like image data
  const { } = useContext(CameraContext);

  return (
    <View>
      <CameraComponent/>
    </View>
  );
}