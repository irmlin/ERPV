import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:
        "http://192.168.1.83:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

// SCANNER HOSTED ON CLOUD, NO NEED TO CHANGE THE LINK
export const axiosInstanceScanner = axios.create({
    baseURL:
        "https://pvp-scanner.azurewebsites.net/",
    headers: {
        "Content-Type": "application/json",
    },
});
