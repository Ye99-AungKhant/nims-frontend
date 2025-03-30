import { apiClient } from "../utils/axios/apiClient";

export const getBrand = async (type_group: string) => {
  return await apiClient.get("/brand", {
    params: {
      type_group,
    },
  });
};

export const createBrand = async (params: any) => {
  return await apiClient.post("/brand", params);
};
