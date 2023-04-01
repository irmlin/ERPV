import {Text, View, TouchableOpacity, ImageBackground, Image} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';

export default function CameraPreview ({photo, boxes, retakePhoto, savePhoto})  {

  const renderBoundingBox = () => {

    if (!photo.width || !photo.height || !boxes.length) {
      return null;
    }

    return (
      <>
        {
          boxes.map((box, i) => (
              <View
                key={i}
                style={{
                  position: 'absolute',
                  left: (box[0] / photo.width) * 100 + '%',
                  top: (box[1] / photo.height) * 100 + '%',
                  width: (box[2] / photo.width) * 100 + '%',
                  height: (box[3] / photo.height) * 100 + '%',
                  borderWidth: 2,
                  borderColor: 'red'
                }}
              >
               <Text  style={{ color: 'red', textAlign: 'center', marginTop: -20, fontSize: 12 }}>{box[4].toFixed(2)}</Text> 
              </View>
          ))
        }
      </>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={{
          flex: 1
        }}
      >
        {renderBoundingBox()}
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={retakePhoto}
            >
              <Icon name="reload" size={50} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}