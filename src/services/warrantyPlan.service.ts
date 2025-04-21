import { apiClient } from "../utils/axios/apiClient";

export const createWarrantyPlan = async (params: any) => {
  return await apiClient.post("/plan", params);
};

export const getWarrantyPlan = async () => {
  return await apiClient.get("/plan");
};

export const updateWarrantyPlan = async (params: any) => {
  return await apiClient.patch("/plan", params);
};

export const deleteWarrantyPlan = async (params: any) => {
  return await apiClient.delete(`/plan/${params}`);
};
