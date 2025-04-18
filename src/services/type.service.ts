import { apiClient } from "../utils/axios/apiClient";

export const getType = async (type_group: string) => {
  return await apiClient.get("/type", {
    params: {
      type_group,
    },
  });
};

export const createType = async (params: any) => {
  return await apiClient.post("/type", params);
};

export const updateType = async (params: any) => {
  return await apiClient.patch("/type", params);
};

export const deleteType = async (params: any) => {
  return await apiClient.delete(`/type/${params}`);
};
