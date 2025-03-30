import { apiClient } from "../utils/axios/apiClient";

export const createFormSubmit = async (params: any) => {
  return await apiClient.post("/createForm", params);
};

export const getInstalled = async (param: boolean | "") => {
  return await apiClient.get(`/createForm?filterByExpireDate=${param}`);
};
