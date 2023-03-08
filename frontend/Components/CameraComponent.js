import {StatusBar} from 'expo-status-bar'
import { useContext, useRef, useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native'
import {Camera, CameraType} from 'expo-camera'
import {CameraContext} from '../Contexts/CameraContext';
import CameraPreview from './CameraPreview';


export default function CameraComponent() {

  const cameraRef = useRef(null);
  const { cameraStarted, setCameraStarted } = useContext(CameraContext);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flashMode, setFlashMode] = useState('off')

  const takePicture = async () => {
    if (!cameraRef.current)
      return
    
    const photo = await new Promise(async resolve => {
      setLoading(true)
      await cameraRef.current.takePictureAsync({onPictureSaved : resolve});
      cameraRef.current.pausePreview();
    })
    cameraRef.current.resumePreview();

    setLoading(false);
    // really bad, but will work for now
    setTimeout(() => setPreviewVisible(true), 1)
    setCapturedImage(photo);
  }

  const savePhoto = () => {}

  const retakePhoto = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
  }

  const handleFlashMode = () => {
    console.log(flashMode)
    if (flashMode === 'on') {
      setFlashMode('off')
    } else if (flashMode === 'off') {
      setFlashMode('on')
    } else {
      setFlashMode('auto')
    }
  }

  const styles = StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: 'black',
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
              width: '100%',
              height: '67%',
              marginBottom: 100
            }}
          >
            {
              previewVisible && capturedImage ? (
                <CameraPreview photo={capturedImage} savePhoto={savePhoto} retakePhoto={retakePhoto} />
              ) : (
                <Camera
                  style={{flex: 1}}
                  ref={cameraRef}
                  flashMode={flashMode}
                >
                  <View
                    style={{
                      flex: 1,
                      width: '100%',
                      backgroundColor: 'transparent',
                      flexDirection: 'row'
                    }}
                  >
                    <View
                      style={{
                        position: 'absolute',
                        left: '5%',
                        top: '10%',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <TouchableOpacity
                        onPress={handleFlashMode}
                        style={{
                          backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                          borderRadius: 20,
                          height: 30,
                          width: 30
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 23
                          }}
                        >
                          ⚡️
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <ActivityIndicator size={90} color="#00ff00" animating={loading} style={{flex:1}}/>
                  </View>
                </Camera>
              )
            }
          </View>
        )
      }
      {
        !previewVisible &&
          <View
            style={{
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            paddingBottom: "12%",
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
      }
      <StatusBar style="auto" />
    </View>
  );
}