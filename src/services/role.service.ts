import { apiClient } from "../utils/axios/apiClient";

export const getRole = async () => {
  return await apiClient.get("/role");
};
