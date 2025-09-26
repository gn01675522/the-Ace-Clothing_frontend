import axios from "axios";

const api = axios.create({
    baseURL: process.env.APP_API_URL || "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("hexToken="))
            ?.split("=")[1];

        if (token) {
            config.headers["Authorization"] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;