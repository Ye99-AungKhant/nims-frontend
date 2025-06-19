import { apiClient } from "../utils/axios/apiClient";

export const getDashboardData = async (year: string) => {
  return await apiClient.get("/dashboard", {
    params: { year },
  });
};
