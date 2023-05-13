import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:
        "http://192.168.0.58:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

export const axiosInstanceScanner = axios.create({
    baseURL:
        "http://192.168.0.58:8000",
    headers: {
        "Content-Type": "application/json",
    },
});
