import { apiClient } from "../utils/axios/apiClient";

export const deleteInstallImage = async (id: number) => {
  return await apiClient.delete(`/installImage/${id}`);
};
