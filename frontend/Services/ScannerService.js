import { axiosInstanceScanner } from "../httpClient"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const scanPackage = async (base64Image) => {
  try {
    return await axiosInstanceScanner.post("/cv_api/detect", {"base64_image": base64Image});
  } catch (err) {
      console.error("Scanner failed to detect signs", err);
      return err.response;
  }
};