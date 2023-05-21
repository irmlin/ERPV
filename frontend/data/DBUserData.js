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
      const userData = response.data;
      return userData;
  } catch (err) {
      console.error(err);
      return err.response;
  }
};

export const fetchUserAvatarsJSON = async () => {
  try {
      const cookie = await AsyncStorage.getItem('JWT_COOKIE');
      const response = await axiosInstance.get('/api/user/avatars',
      {
          withCredentials: true,
          headers: {
            'Cookie': cookie
          }
        });
      const userAvatars = response.data;
      return userAvatars;
  } catch (err) {
      console.error(err);
      return err.response;
  }
};

export const putUserAvatar = async (id) => {
  try {
    const cookie = await AsyncStorage.getItem('JWT_COOKIE');
    data = {
      "avatarId": id
    };
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
};
