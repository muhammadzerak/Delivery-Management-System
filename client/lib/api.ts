// lib/api.ts
import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://delivery-management-system-lyart.vercel.app/api",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;
