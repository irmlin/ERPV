import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";
import { CLASSIFICATION_CODES_MAP} from "../data/RecyclingCodesData";

export default function CameraPreview({
  photo,
  classes,
  boxes,
  retakePhoto,
  savePhoto,
  upperMessageState,
  loading,
}) {
  const renderBoundingBox = () => {
    console.log(classes)
    if (!photo.width || !photo.height || !boxes.length) {
      return null;
    }

    return (
      <>
        {boxes.map((box, i) => (
          <View
            key={i}
            style={{
              position: "absolute",
              left: (box[0] / photo.width) * 100 + "%",
              top: (box[1] / photo.height) * 100 + "%",
              width: (box[2] / photo.width) * 100 + "%",
              height: (box[3] / photo.height) * 100 + "%",
              borderWidth: 2,
              borderColor: "red",
            }}
          >
            {/* {
              classes.length && (
              <Text  style={{ color: 'red', textAlign: 'center', marginTop: -20, fontSize: 12 }}>{CLASSIFICATION_CODES_MAP[classes[i][0]]}: {classes[i][1].toFixed(2)}</Text> 
            )} */}
          </View>
        ))}
      </>
    );
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
        }}
      >
        {renderBoundingBox()}
        <View
          style={{
            width: "100%",
            height: "18%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              width: 240,
              height: 70,
              borderRadius: 10,
              borderWidth: 4,
              marginTop: 15,
              borderColor: "white",
              backgroundColor: upperMessageState.color,
              justifyContent: "center",
              alignItems: "center",
              display: upperMessageState.visible ? "flex" : "none",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 17,
                fontWeight: "bold",
                width: "90%",
              }}
            >
              {upperMessageState.text}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            padding: 15,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={retakePhoto}>
              <Icon name="reload" size={50} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
