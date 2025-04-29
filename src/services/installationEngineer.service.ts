import { apiClient } from "../utils/axios/apiClient";

export const getInstallationEngineer = async () => {
  return await apiClient.get("/user/installation-engineer");
};

export const createInstallationEngineer = async (params: any) => {
  return await apiClient.post("/user/installation-engineer", params);
};

export const updateInstallationEngineer = async (params: any) => {
  return await apiClient.patch("/user", params);
};

export const deleteInstallationEngineer = async (params: any) => {
  return await apiClient.delete(`/user/${params}`);
};
