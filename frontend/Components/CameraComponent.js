import {StatusBar} from 'expo-status-bar'
import { useContext, useRef, useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native'
import {Camera} from 'expo-camera'
import {CameraContext} from '../Contexts/CameraContext';


export default function CameraComponent() {

  const cameraRef = useRef(null);
  const { cameraStarted, setCameraStarted } = useContext(CameraContext);
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)

  const takePicture = async () => {
    if (!cameraRef.current)
      return
    const photo = await cameraRef.current.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
  }

  const CameraPreview = (photo) => {
    console.log('camera preview', photo)
    return (
      <View
        style={{
          backgroundColor: 'transparent',
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
        />
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

  return (
    <View style={styles.container}>
      { 
        cameraStarted ?
        (
          <View
            style={{
              flex: 1,
              width: '100%'
            }}
          >
            {
              previewVisible && capturedImage ? (
                <CameraPreview photo={capturedImage} />
              ) : (
                <Camera
                  style={{flex: 1, width:"100%"}}
                  ref={cameraRef}
                >
                  <View
                    style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between'
                    }}
                  >
                    <View
                      style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                    >
                        <TouchableOpacity
                          onPress={takePicture}
                          style={{
                          width: 70,
                          height: 70,
                          bottom: 0,
                          borderRadius: 50,
                          backgroundColor: '#fff'
                        }}
                        />
                    </View>
                  </View>
                </Camera>
              )
            }
          </View>
        ) : (<View><Text>daskjndajksndakjs</Text></View>)
      }
      <StatusBar style="auto" />
    </View>
  );
}