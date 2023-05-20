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


export const addNewAvatarForUser = async() => {
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
