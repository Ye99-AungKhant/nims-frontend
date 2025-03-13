import { apiClient } from "../utils/axios/apiClient";

export const getClient = async () => {
  return await apiClient.get("/client");
};
