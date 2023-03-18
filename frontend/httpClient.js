import axios from "axios";

const axiosInstance = axios.create({
    baseURL:
        "http://192.168.1.83:8080",
        // "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;