import { apiClient } from "../utils/axios/apiClient";

export const getPermission = async () => {
  return await apiClient.get("/permission");
};
