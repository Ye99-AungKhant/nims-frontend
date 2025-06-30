import { apiClient } from "../utils/axios/apiClient";

export const vehicleChange = async (params: any) => {
  return await apiClient.post("/vehicle/change", params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const vehicleActivity = async (id: number) => {
  return await apiClient.get("/vehicle/change/activity", {
    params: {
      id: id,
    },
  });
};
