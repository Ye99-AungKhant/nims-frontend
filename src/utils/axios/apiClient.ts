import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { environment } from "../../config/enviroment/environment";
import useUserStore from "../../store/useUserStore";
import { getRefreshToken } from "../../services/auth.service";

const HTTP_UNAUTHORIZED = 401;

export const apiClient = axios.create({
  baseURL: environment.API_URL,
});

export const authClient = axios.create({
  baseURL: environment.API_URL,
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().user?.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // If there's no response data, treat it as an error
    if (!response.data) {
      return Promise.reject(response);
    }
    return response;
  },
  async (error: AxiosError) => {
    const { response, config } = error;
    const originalRequest = config as AxiosRequestConfig & { _retry?: boolean };

    if (response?.status === HTTP_UNAUTHORIZED && !originalRequest._retry) {
      originalRequest._retry = true;

      const { user, setUser, clearUser } = useUserStore.getState();

      const refreshToken = user?.refreshToken;
      if (!refreshToken) {
        clearUser();
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await getRefreshToken({ refreshToken });

        const newToken = refreshResponse.data?.data?.token;
        if (!newToken) throw new Error("Token missing in refresh response");

        setUser({ ...user, token: newToken });

        // Retry original request with new token
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newToken}`,
        };

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token error:", refreshError);
        clearUser();
        return Promise.reject(refreshError);
      }
    }

    // Optional: log or handle non-401 errors
    return Promise.reject(response || error);
  }
);
