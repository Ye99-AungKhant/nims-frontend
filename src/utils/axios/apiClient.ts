import axios from "axios";
import { environment } from "../../config/enviroment/environment";

export const apiClient = axios.create({
  baseURL: environment.API_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    //   const token = localStorage.getItem(cacheKeys.IR_ACCESS_TOKEN)
    //   if (token) {
    //     config.headers.setAuthorization(`Bearer ${token}`)
    //   }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  async (response) => {
    if (!response.data) {
      return Promise.reject(response);
    }
    return response;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
      }
    }
    return Promise.reject(err.response);
  }
);
