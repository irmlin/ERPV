import axiosInstance from "../httpClient"
import AsyncStorage from '@react-native-async-storage/async-storage';


export const fetchQuestionsJSON = async () => {
    try {
        const response = await axiosInstance.get('/api/questions');
        const quizQuestions = response.data;
        return quizQuestions;
    } catch (err) {
        console.error("no klausimai", err);
        return err.response;
    }
  };

