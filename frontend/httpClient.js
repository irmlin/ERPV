import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:
        "http://192.168.1.83:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

export const axiosInstanceScanner = axios.create({
    baseURL:
        "http://192.168.1.83:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

//sdasdas