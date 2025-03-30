import { apiClient } from "../utils/axios/apiClient";

export const getInstallationEngineer = async () => {
  return await apiClient.get("/user/installation-engineer");
};
