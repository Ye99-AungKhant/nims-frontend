import { apiClient } from "../utils/axios/apiClient";

export const getModel = async (type_group: string, brand_id?: number) => {
  return await apiClient.get("/model", {
    params: {
      type_group,
      brand_id,
    },
  });
};

export const getAllModel = async (type_group: string) => {
  return await apiClient.get("/model/all", {
    params: {
      type_group,
    },
  });
};

export const createModel = async (params: any) => {
  return await apiClient.post("/model", params);
};

export const updateModel = async (params: any) => {
  return await apiClient.patch("/model", params);
};

export const deleteModel = async (params: any) => {
  return await apiClient.delete(`/model/${params}`);
};
