import { apiClient } from "../utils/axios/apiClient";

export const login = async (params: any) => {
  return await apiClient.post("/login", params);
};
