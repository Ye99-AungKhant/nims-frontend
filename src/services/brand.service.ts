import { apiClient } from "../utils/axios/apiClient";

export const getBrand = async (type_group: string, type_id?: any) => {
  return await apiClient.get("/brand", {
    params: {
      type_group,
      type_id,
    },
  });
};

export const createBrand = async (params: any) => {
  return await apiClient.post("/brand", params);
};

export const updateBrand = async (params: any) => {
  return await apiClient.patch("/brand", params);
};

export const deleteBrand = async (params: any) => {
  return await apiClient.delete(`/brand/${params}`);
};
