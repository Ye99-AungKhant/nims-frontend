import { apiClient, authClient } from "../utils/axios/apiClient";

export const login = async (params: any) => {
  return await apiClient.post("/login", params);
};

export const getRefreshToken = async (params: any) => {
  return await authClient.post("/login/refresh-token", params);
};
