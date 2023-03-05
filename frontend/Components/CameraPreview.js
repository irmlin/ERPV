import {Text, View, TouchableOpacity, ImageBackground, Image} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


export default function CameraPreview ({photo, retakePhoto, savePhoto})  {

  return (
    <View
      style={{
        // backgroundColor: 'transparent',
        // backgroundColor: 'red',
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
              {/* <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                Re-take
              </Text> */}
              <Icon name="reload" size={50} color="white" />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,
                backgroundColor: 'green',
                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                save photo
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}