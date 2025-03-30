import { apiClient } from "../utils/axios/apiClient";

export const getWarrantyPlan = async () => {
  return await apiClient.get("/plan");
};
