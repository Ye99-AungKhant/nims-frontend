import { apiClient } from "../utils/axios/apiClient";

export const getDashboardData = async (year: string) => {
  return await apiClient.get("/dashboard", {
    params: { year },
  });
};

export const getAccessoryUsage = async () => {
  return await apiClient.get("/dashboard/accessory-usage");
};

export const getSimcardUsage = async () => {
  return await apiClient.get("/dashboard/simcard-usage");
};

export const getGPSUsage = async () => {
  return await apiClient.get("/dashboard/gps-usage");
};

export const getPeripheralUsage = async () => {
  return await apiClient.get("/dashboard/peripheral-usage");
};
