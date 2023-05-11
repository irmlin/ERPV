import axiosInstance from "../httpClient"

export const fetchQuestionsJSON = async () => {
    try {
        const response = await axiosInstance.get('/api/questions');
        console.log(response)
        const quizQuestions = response.data;
        console.log(response.data)
        return quizQuestions;
    } catch (err) {
        console.error("no klausimai", err);
        return err.response;
    }
  };

