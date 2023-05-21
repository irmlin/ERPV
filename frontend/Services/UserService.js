import {axiosInstance} from "../httpClient"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addNewAvatarForUser = async(id) => {
  try {
    const cookie = await AsyncStorage.getItem('JWT_COOKIE');
    return await axiosInstance.put("/api/user/avatars", {id}, 
     {
      withCredentials: true,
      headers: {
        'Cookie': cookie
      }
    });
  } catch (err) {
      console.error("An error occured while adding new avatar for user", err);
      return err.response;
  }
}

export const getUserAvatars = async() => {
  try {
    const cookie = await AsyncStorage.getItem('JWT_COOKIE');
    return await axiosInstance.get("/api/user/avatars",
     {
      withCredentials: true,
      headers: {
        'Cookie': cookie
      }
    });
  } catch (err) {
      console.error("An error occured while fetching user avatars", err);
      return err.response;
  }
}

export const getUser = async() => {
  try {
    const cookie = await AsyncStorage.getItem('JWT_COOKIE');
    return await axiosInstance.get("/api/user",
     {
      withCredentials: true,
      headers: {
        'Cookie': cookie
      }
    });
  } catch (err) {
      console.error("An error occured while fetching user data", err);
      return err.response;
  }
}


export const updateUserPoints = async(totalAmountOfPoints) => {
  try {
    const cookie = await AsyncStorage.getItem('JWT_COOKIE');
    return await axiosInstance.put("/api/user", {totalAmountOfPoints},
     {
      withCredentials: true,
      headers: {
        'Cookie': cookie
      }
    });
  } catch (err) {
      console.error("An error occured while updating user points", err);
      return err.response;
  }
}
