import {axiosInstance} from "../httpClient"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAllAvatars = async() => {
  try {
    const cookie = await AsyncStorage.getItem('JWT_COOKIE');
    return await axiosInstance.get("/api/avatars",
     {
      withCredentials: true,
      headers: {
        'Cookie': cookie
      }
    });
  } catch (err) {
      console.error("An error occured while fetching all avatars", err);
      return err.response;
  }
}
