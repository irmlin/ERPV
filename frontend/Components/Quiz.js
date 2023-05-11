import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated, StyleSheet, } from 'react-native';
import data from '../data/QuizData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { fetchQuestionsJSON } from '../data/DBQuizData';


export default function Quiz()  {

    const navigation = useNavigation();
    const [allQuestions, setQuestions] = useState(data);
    useEffect(() => {
        // Fetch the questions from the API
        // fetchQuestionsJSON()
        //   .then(data => setQuestions(shuffleArray(data)))
        //   .catch(error => console.error(error));
      }, []);
    
      function shuffleArray(array) {
        // Shuffle the array using a random comparison function
        return (array.sort(() => Math.random() - 0.5)).slice(0,7);

      }
      
    //const allQuestions.onload = useState(fetchQuestionsJSON());
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);

    const validateAnswer = (selectedOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correctOption'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if(selectedOption==correct_option){
            // Set Score
            setScore(score+1)
        }
        // Show Next Button
        setShowNextButton(true)
    };    

    const handleNext = () => {
        if(currentQuestionIndex== allQuestions.length-1){
            // Last Question
            // Show Score Modal
            setShowScoreModal(true)
        }else{
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex+1,
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

    const renderQuestion = () => {
        return (
            <View style={{
                marginVertical: "5%"
            }}>
                {/* Question Counter */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{color: '#000000', fontSize: 17, opacity: 0.6, fontWeight: '500', marginRight: 2}}>{currentQuestionIndex+1}</Text>
                    <Text style={{color: '#000000', fontSize: 17, opacity: 0.6, fontWeight: '500'}}>/{allQuestions.length}</Text>
                </View>

                {/* Question */}
                <Text style={{
                    color: '#000000',
                    fontSize: 30,
                    fontWeight: '400',
                }}>{allQuestions[currentQuestionIndex]?.question}</Text>
            </View>
        )
    };

    

    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%','100%']
    });

    const renderOptions = () => {
        return (
            <View>
                {
                    allQuestions[currentQuestionIndex]?.options.map(option => (
                        <TouchableOpacity 
                        onPress={()=> validateAnswer(option)}
                        disabled={isOptionsDisabled}
                        key={option}
                        style={{
                            borderWidth: 3, 
                            borderColor: option==correctOption 
                            ? '#00C851'
                            : option==currentOptionSelected 
                            ? '#ff4444' 
                            : '#1E90FF' +'40',
                            backgroundColor: option==correctOption 
                            ? '#3a9fbf' +'20'
                            : option==currentOptionSelected 
                            ? '#ff4444' +'20'
                            : '#1E90FF' +'20',
                            height: 60, borderRadius: 20,
                            flexDirection: 'row',
                            
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            paddingHorizontal: "3%",
                            marginVertical: "3%",
                            
                        }}
                        >
                            <Text style={{fontSize: 20, color: '#171717'}}>{option}</Text>

                            {/* Show Check Or Cross Icon based on correct answer*/}
                            {
                                option==correctOption ? (
                                    <View style={{
                                        width: "10%", height: "60%", borderRadius: 30/2,
                                        backgroundColor: '#00C851',
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name="check" style={{
                                            color: "#FFFFFF",
                                            fontSize: 25
                                        }} />
                                    </View>
                                ): option == currentOptionSelected ? (
                                    <View style={{
                                        width: "10%", height: "60%", borderRadius: 30/2,
                                        backgroundColor: '#ff4444',
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name="close" style={{
                                            color: '#FFFFFF',
                                            fontSize: 25
                                        }} />
                                    </View>
                                ) : null
                            }

                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    };

    const renderNextButton = () => {
        if(showNextButton){
            return (
                <TouchableOpacity
                activeOpacity={0.95}
                onPress={handleNext}
                style={{
                     width: '100%',  height: 60, backgroundColor: '#3a9fbf', justifyContent: "center" , alignItems: "center", borderRadius: 17, 
                     marginVertical: "3%",
                }}>
                    <Text style={{fontSize: 30,
      fontWeight: '500',  }}>Kitas</Text>
                </TouchableOpacity>
            )
        }
        else{
            return null
        }
    };

    const renderProgressBar = () => {
        return (
            <View style={{
                width: '100%',
                height: 20,
                borderRadius: 20,
                backgroundColor: '#00000020',

            }}>
                <Animated.View style={[{
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: '#3498db'
                },{
                    width: progressAnim
                }]}>

                </Animated.View>

            </View>
        )
    };

    return(
        <SafeAreaView >
           <View style={{
            flex: 0,
            width: "100%",
            height: "100%",
            paddingVertical: "5%",
            paddingHorizontal: "5%",
            paddingBottom: "10%",
            backgroundColor: "#add8e6",
            margin: 0,
           }}>
               {/* ProgressBar */}
               { renderProgressBar() }
                
               {/* Question */}
               {renderQuestion()}

               {/* Options */}
               {renderOptions()}

               {/* Next Button */}
               {renderNextButton()}

               {/* Score Modal */}
               <Modal
               animationType="slide"
               transparent={true}
               visible={showScoreModal}
               >
                    {/* Quiz end page background */}
                   <View style={{
                       flex: 1,
                       backgroundColor: '#add8e6',
                       alignItems: 'center',
                       justifyContent: 'center'
                   }}>
                        {/* Quiz end page score window */}
                       <View style={{
                           backgroundColor: '#EEF8FD',
                           width: '80%',
                           borderRadius: 20,
                           padding: 10,
                           alignItems: 'center'
                       }}>
                           <Text style={{fontSize: 40, fontWeight: 'bold'}}>{ score> (allQuestions.length/2) ? 'Sveikinimai!' : 'O ne :(((' }</Text>

                           <View style={{
                               flexDirection: 'row',
                               justifyContent: 'flex-start',
                               alignItems: 'center',
                               marginVertical: '15%'
                           }}>
                               <Text style={{
                                   fontSize: 45,
                                   color: score> (allQuestions.length/2) ? '#00C851' : '#ff4444'
                               }}>{score}</Text>
                                <Text style={{
                                    fontSize: 40, color: '#171717'
                                }}> / { allQuestions.length }</Text>
                           </View>
                           {/* Retry Quiz button */}
                           <TouchableOpacity
                           onPress={restartQuiz}
                           style={{
                               backgroundColor: '#107dac',
                               padding: 20, width: '95%', borderRadius: 20, marginBottom: '2%'
                           }}>
                               <Text style={{
                                   textAlign: 'center', color: '#F2F2FC', fontSize: 25, fontWeight: '500'
                               }}>Pakartoti</Text>
                           </TouchableOpacity>

                           <TouchableOpacity
                           onPress={toHomePage}
                           style={{
                               backgroundColor: '#107dac',
                               padding: 30, width: '95%', borderRadius: 20, marginBottom: '2%'
                           }}>
                               <Text style={{
                                   textAlign: 'center', color: '#F2F2FC', fontSize: 25, fontWeight: '500'
                               }}>Pagrindinis puslapis</Text>
                           </TouchableOpacity>
                       </View>
                   </View>
               </Modal>

           </View>
       </SafeAreaView>
    )

}