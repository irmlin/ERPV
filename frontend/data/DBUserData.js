import {axiosInstance} from "../httpClient"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUserJSON = async () => {
    try {
        const cookie = await AsyncStorage.getItem('JWT_COOKIE');
        const response = await axiosInstance.get('/api/user',
        {
            withCredentials: true,
            headers: {
              'Cookie': cookie
            }
          });
        const quizQuestions = response.data;
        return quizQuestions;
    } catch (err) {
        console.error(err);
        return err.response;
    }
  };

