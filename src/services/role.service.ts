import { apiClient } from "../utils/axios/apiClient";

export const getRole = async () => {
  return await apiClient.get("/role");
};

export const createRole = async (name: any) => {
  return await apiClient.post("/role", name);
};
