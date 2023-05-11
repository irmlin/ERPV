import axiosInstance from "../httpClient"

export const fetchUserJSON = async () => {
    try {
        const response = await axiosInstance.get('/api/user');
        const quizQuestions = response.data;
        return quizQuestions;
    } catch (err) {
        console.error(err);
        return err.response;
    }
  };

