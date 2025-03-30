import { apiClient } from "../utils/axios/apiClient";

export const getModel = async (type_group: string, brand_id?: number) => {
  return await apiClient.get("/model", {
    params: {
      type_group,
      brand_id,
    },
  });
};

export const createModel = async (params: any) => {
  return await apiClient.post("/model", params);
};
