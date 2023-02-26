import {StatusBar} from 'expo-status-bar'
import { useContext, useRef, useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {Camera, CameraType} from 'expo-camera'
import {CameraContext} from '../Contexts/CameraContext';
import CameraPreview from './CameraPreview';


export default function CameraComponent() {

  const cameraRef = useRef(null);
  const { cameraStarted, setCameraStarted } = useContext(CameraContext);
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)

  const takePicture = async () => {
    if (!cameraRef.current)
      return
    const photo = await cameraRef.current.takePictureAsync()
    setPreviewVisible(true)
    setCapturedImage(photo)
  }

  const savePhoto = () => {}

  const retakePhoto = () => {
    console.log('im trigerrrrred')
    setCapturedImage(null)
    setPreviewVisible(false)
    // startCamera()
  }

  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: '#fff',
      // backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

  return (
    <View style={styles.container}>
      { 
        cameraStarted &&
        (
          <View
            style={{
              // flex: 1,
              width: '100%',
              height: '90%'
            }}
          >
            {
              previewVisible && capturedImage ? (
                <CameraPreview photo={capturedImage} savePhoto={savePhoto} retakePhoto={retakePhoto} />
              ) : (
                <Camera
                  style={{flex: 1}}
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
        )
      }
      <StatusBar style="auto" />
    </View>
  );
}