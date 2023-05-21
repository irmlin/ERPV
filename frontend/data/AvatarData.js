import {axiosInstance} from "../httpClient"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchAvatarJSON = async () => {
  try {
      const cookie = await AsyncStorage.getItem('JWT_COOKIE');
      const response = await axiosInstance.get('/api/avatars',
      {
          withCredentials: true,
          headers: {
            'Cookie': cookie
          }
        });
      const avatarData = response.data;
      return avatarData;
  } catch (err) {
      console.error(err);
      return err.response;
  }
};
