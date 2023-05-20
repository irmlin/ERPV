import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:
    "http://192.168.43.189:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

export const axiosInstanceScanner = axios.create({
    baseURL:
    "http://212.24.110.139:8000",
    headers: {
        "Content-Type": "application/json",
    },
});
