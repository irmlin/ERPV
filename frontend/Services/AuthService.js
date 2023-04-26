import axiosInstance from "../httpClient"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerNewUser = async (username, email, password) => {
  try {
    return await axiosInstance.post("/api/auth/register", {username, email, password})
  } catch (err) {
      console.error("Could not register new user ", err);
      return err.response;
  }
};

export const login = async (username, password) => {
  try {
    return await axiosInstance.post("/api/auth/login", {username, password});
  } catch (err) {
      console.error("Could not login", err);
      return err.response;
  }
};

export const logout = async () => {
  try {
    return await axiosInstance.post("/api/auth/logout");
  } catch (err) {
      console.error("Could not logout", err);
      return err.response;
  }
};



// EXAMPLE OF REQUEST WITH COOKIE (FOR AUTHENTICATED ENDPOINTS)
export const testAuthenticatedEndpoint = async() => {
  try {
    const cookie = await AsyncStorage.getItem('JWT_COOKIE');
    return await axiosInstance.get("/api/test/authenticated",
     {
      withCredentials: true,
      headers: {
        'Cookie': cookie
      }
    });
  } catch (err) {
      console.error("An error occured", err);
      return err.response;
  }
}