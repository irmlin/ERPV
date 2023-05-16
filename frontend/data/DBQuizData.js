import {axiosInstance} from "../httpClient"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchQuestionsJSON = async () => {
    try {
        const cookie = await AsyncStorage.getItem('JWT_COOKIE');
        const response = await axiosInstance.get('/api/questions',
        {
            withCredentials: true,
            headers: {
              'Cookie': cookie
            }
          });
        const quizQuestions = response.data;
        return quizQuestions;
    } catch (err) {
        console.error("no klausimai", err);
        return err.response;
    }
  };

export const putQuestionData = async (points, questions, correct) => {
  try {
    const cookie = await AsyncStorage.getItem('JWT_COOKIE');
    const responseGet = await axiosInstance.get('/api/user',
        {
            withCredentials: true,
            headers: {
              'Cookie': cookie
            }
        });
    const userData = responseGet.data;
    points += userData.totalAmountOfPoints;
    questions += userData.amountOfQuestions;
    correct += userData.correctAnswers;
    const tries = userData.amountOfTries + 1;
    data = {
      "totalAmountOfPoints": points,
      "amountOfQuestions": questions,
      "amountOfTries": tries,
      "correctAnswers": correct
    }
    const responsePut = await axiosInstance.put('/api/user', data,
        {
            withCredentials: true,
            headers: {
              'Cookie': cookie
            }
        });
      return responsePut.data;

  } catch (err) {
    console.error("nepavyko atnaujinti duomenu", err);
  }
}
