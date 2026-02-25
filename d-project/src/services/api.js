import axios from "axios";

export const API_BASE_URL = "http://localhost:5000";
//export const API_BASE_URL = "https://chizatoback.onrender.com";
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Error 401: No autorizado. Redirigiendo al login...");
    }
    return Promise.reject(error);
  },
);

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/api/users/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error in registerUser:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post("/api/users/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw error;
  }
};

export default apiClient;
