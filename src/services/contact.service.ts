import { apiClient } from "../utils/axios/apiClient";

export const createContact = async (params: any) => {
  return await apiClient.post("/contact-person", params);
};

export const updateContact = async (params: any) => {
  return await apiClient.patch("/contact-person", params);
};

export const deleteContact = async (params: any) => {
  return await apiClient.delete(`/contact-person/${params}`);
};
