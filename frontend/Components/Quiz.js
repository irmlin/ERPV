import React, { useEffect, useState } from 'react';
//import { resolveAssetSource } from 'react-native/Libraries/Image/resolveAssetSource';
import { View, Text, SafeAreaView, Image, TouchableOpacity, Modal, Animated, StyleSheet, ImageBackground, Pressable, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { fetchAvatarJSON } from '../data/AvatarData';
import { fetchUserJSON } from '../data/DBUserData';
import ImageImport from "../data/ImageImport";
import { fetchQuestionsJSON, putQuestionData } from '../data/DBQuizData';


export default function Quiz() {

  const [userData, setUserData] = useState([]);
  const [avatarData, setAvatarData] = useState([]);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    fetchAvatarJSON()
      .then(data => {
        setAvatarData(data);
        fetchUserJSON()
          .then(userData => {
            setUserData(userData);
            getImage(userData, data);
          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  }, []);

  const getImage = async (userData, avatarData) => {
    const avatar = avatarData.find(item => item.id === userData.avatarId);
    if (avatar) {
      const pictureName = avatar.pictureName;
      const imageName = pictureName.toLowerCase().split("-")[0];
      const image = ImageImport[imageName];
      if (image !== undefined) {
        setAvatar(image);
      } else {
        console.warn(`Image not found for pictureName: ${pictureName}`);
      }
    } else {
      console.warn(`Avatar not found for id: ${userData.avatarId}`);
    }
  };




  
  const navigation = useNavigation();
  const [allQuestions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch the questions from the API
    fetchQuestionsJSON()
      .then(data => setQuestions(shuffleArray(data)))
      .catch(error => console.error(error));
  }, []);

  function shuffleArray(array) {
    // Shuffle the array using a random comparison function
    return (array.sort(() => Math.random() - 0.5)).slice(0, 7);

  }

  //const allQuestions.onload = useState(fetchQuestionsJSON());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showExplainModal, setShowExplainModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  const validateAnswer = (selectedOption) => {
    let correct_option = allQuestions[currentQuestionIndex]['correctOption'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption == correct_option) {
      // Set Score
      setScore(score + 1)
    }
    // Show Next Button
    setShowExplainModal(true)
    setShowNextButton(true)
  };

  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      putQuestionData(score * 5, allQuestions.length, score)
      setShowScoreModal(true)
      setShowExplainModal(false)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
      setShowExplainModal(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false
    }).start();
  };

  const restartQuiz = () => {
    setShowScoreModal(false);

    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false
    }).start();
  };

  const toHomePage = () => {
    navigation.navigate("Home");
  };

  const toAvatarPage = () => {
    navigation.navigate("Avatar");
  };


  const getImageSource = (pictureName) => {
    switch (pictureName) {
      case '6.png':
        return require('frontend/assets/quiz/6.png');
      case '14.png':
        return require('frontend/assets/quiz/14.png');
      case '15.png':
        return require('frontend/assets/quiz/15.png');
      case '17.png':
        return require('frontend/assets/quiz/17.png');
      // Add more cases for different image names if needed
      default:
        return null; // Return null or a default image source if the pictureName is not recognized
    }
  };

  const renderQuestion = () => {
    const pictureName = allQuestions[currentQuestionIndex]?.pictureName;
    const imageSource = pictureName ? getImageSource(pictureName) : null;
    return (
      <View style={{
        position: "absolute",
        top: height * 0.18,
        alignSelf: 'center',
      }}>
        {/* Question */}
        <Text style={{
          color: '#000000',
          fontSize: 25,
          fontWeight: '600',
          textAlign: 'center',
        }}>{allQuestions[currentQuestionIndex]?.question}</Text>
        {/* Image */}
        {imageSource && (
        <Image
          source={imageSource}
          style={{
            resizeMode: "contain",
            width: width * 0.6,
            height: height * 0.2,
            alignSelf: 'center',
            marginTop: 13,
          }}
        />
      )}
      </View>
    );
  };



  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ['0%', '100%']
  });

  const renderOptions = () => {
    const pictureName = allQuestions[currentQuestionIndex]?.pictureName
    const isPicture = pictureName !== null || true;
    return (
      <View>
        {
          allQuestions[currentQuestionIndex]?.options.map(option => (
            <TouchableOpacity
              onPress={() => validateAnswer(option)}
              disabled={isOptionsDisabled}
              key={option}
              style={{
                borderWidth: 4,
                borderColor: option == currentOptionSelected
                  ? 'white'
                  : option == correctOption
                    ? 'white'
                    : 'white',
                backgroundColor: option == correctOption
                  ? '#70D66E'
                  : option == currentOptionSelected
                    ? '#FF7474'
                    : option != correctOption && option != currentOptionSelected
                      ? '#FAC643'
                      : '#FF7474',
                height: height * 0.08,
                width: width * 0.8,
                borderRadius: 20,
                bottom: isPicture ? height * -0.17 : height * -0.25,
                justifyContent: 'center',
                paddingHorizontal: "3%",
                marginVertical: "3%",
                left: width * 0.1,

              }}
            >
              <Text style={{ fontSize: 20, color: 'white', fontWeight: '700', textAlign: 'center', }}>{option}</Text>

            </TouchableOpacity>
          ))
        }
      </View>
    )
  };

  const [modalVisible, setModalVisible] = useState(false);

  const stylesExplanation = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      left: '10%',
      alignContent: 'center',
      backgroundColor: '#82CCFA',
      borderRadius: 20,
      alignItems: "center",
      shadowColor: "#000",
      height: "50%",
      width: "80%",
      borderColor: "black",
      borderWidth: 4,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5,
      position: 'absolute'
    },
    button: {
      alignSelf: "flex-end",
      flexDirection: "row",
      height: "8%",
      width: "9%",
      marginEnd: "2%",
    },
    button2: {
      alignSelf: "flex-start",
      marginTop: "5%",
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#FF7474',
      marginBottom: '3%'
    },
    button3: {
      alignSelf: "flex-end",
      marginTop: "5%",
      padding: 10,
      borderRadius: 10,
    },
    space: {
      width: "20%",
      height: 20,
    },
    buttonImageIconStyle: {
      height: "100%",
      width: "100%",
      resizeMode: "contain",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 17,
    },
    modalText: {
      justifyContent:'center',
      marginTop:'7%',
      textAlign: "center",
      fontSize: 27,
    },
  });

  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <ImageBackground
          source={require("frontend/assets/icons/Login_Debeselis1.png")}
          style={styles.inputBackground}
        >
          <TouchableOpacity
            activeOpacity={0.95}
            onPress={handleNext}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: '500',
              }}>
              Kitas klausimas
            </Text>
          </TouchableOpacity>
        </ImageBackground>


      )
    }
    else {
      return null
    }
  };

  const renderExplanation = () => {
    if (showExplainModal) {
      return (
        <View style={stylesExplanation.modalView}>
          <ScrollView>
            <Text style={stylesExplanation.modalText}>
              {allQuestions[currentQuestionIndex]?.explanation}
            </Text>
          </ScrollView>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Pressable
              style={stylesExplanation.button2}
              onPress={() => setShowExplainModal(false)}
            >
              <Text style={stylesExplanation.textStyle}>Uždaryti</Text>
            </Pressable>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };


  const renderProgressBar = () => {
    return (
      <View style={{
        width: '60%',
        height: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        left: width * 0.2,
        position: "absolute",
        top: height * 0.1,

      }}>
        <Animated.View style={[{
          height: 20,
          borderRadius: 10,
          backgroundColor: '#70D66E'
        }, {
          width: progressAnim
        }]}>

        </Animated.View>

      </View>
    )
  };

  const { width, height } = Dimensions.get("window");

  const styles = StyleSheet.create({
    image: {
      flex: 1,
      justifyContent: "center",
    },
    bottomContainer: {
      flexDirection: "row",
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: "center",
    },
    avatar: {
      width: 0.35 * width,
      height: 0.35 * width,
    },
    inputBackground: {
      resizeMode: "contain",
      width: width * 0.8,
      height: height * 0.12,
      bottom: 0,
      position: "absolute",
      left: width * 0.1,
      justifyContent: 'center',
      alignItems: 'center',
    },

  });

  return (
    <SafeAreaView >
      <View style={{
        width: "100%",
        height: "100%",
        margin: 0,
      }}>
        <ImageBackground
          source={require("frontend/assets/background_quiz-01.png")}
          style={styles.image}
        >

          {/* ProgressBar */}
          {renderProgressBar()}

          {/* Question */}
          {renderQuestion()}

          {/* Options */}
          {renderOptions()}

          {/* Next Button */}
          {renderNextButton()}

          {/* Explanation */}
          {renderExplanation()}

          {/* Score Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={showScoreModal}
          >
            <ImageBackground
              source={require("frontend/assets/background_quiz-01.png")}
              style={styles.image}
            >
              {/* Quiz end page background */}
              <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Quiz end page score window */}
                <View style={{
                  backgroundColor: '#fef5e7',
                  width: '80%',
                  borderRadius: 20,
                  padding: 10,
                  alignItems: 'center',
                  borderColor: 'white', borderWidth: 5,
                  top: -20,
                }}>
                  <Text style={{
                    fontSize: 30, color: '#171717', fontWeight: '700', textAlign: 'center'
                  }}>{score > (allQuestions.length / 2) ? 'Sveikiname!' : 'O ne :((('}
                  </Text>

                  <Text style={{
                    fontSize: 30, color: '#171717', fontWeight: '700', marginTop: '2%', textAlign: 'center'
                  }}> Atsakei teisingai į {score} 
                      {score == 1 ?' klausimą ' 
                          : ' klausimus '}
                   iš {allQuestions.length}.
                  </Text>

                  
                  <Text style={{
                    fontSize: 30, color: '#171717', fontWeight: '700', marginTop: '2%', textAlign: 'center', marginBottom: '2%'
                  }}> Surinkai {score * 5} 
                        {score == 1 ?' taškus!' 
                          : score == 5 ?' taškus!' 
                          : score == 7 ?' taškus!' 
                          : ' taškų!'}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={toHomePage}
                  style={{
                    backgroundColor: '#6DD8E7',
                    padding: 15, width: '80%', borderRadius: 20,
                    marginBottom: '2%', marginTop: '6%',
                    borderColor: 'white', borderWidth: 5,
                  }}>
                  <Text style={{
                    textAlign: 'center', color: 'black', fontSize: 20, fontWeight: '700'
                  }}>Grįžti į pagrindinį langą</Text>
                </TouchableOpacity>

                

                {/* Retry Quiz button */}
                <TouchableOpacity
                  onPress={restartQuiz}
                  style={{
                    backgroundColor: '#FF7474',
                    padding: 15, width: '80%', borderRadius: 20, marginBottom: '2%',
                    borderColor: 'white', borderWidth: 5,
                    marginBottom: '2%', marginTop: '2%',
                  }}>
                  <Text style={{
                    textAlign: 'center', color: 'black', fontSize: 20, fontWeight: '700'
                  }}>Bandyk iš naujo</Text>
                </TouchableOpacity>

                <View style={styles.bottomContainer}>
                  <Image
                    source={avatar}
                    style={styles.avatar}
                  />

                </View>
              </View>
            </ImageBackground>
          </Modal>
        </ImageBackground>
      </View>
    </SafeAreaView>
  )

}



