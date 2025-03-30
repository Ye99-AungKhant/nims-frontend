import { apiClient } from "../utils/axios/apiClient";

export const getClient = async () => {
  return await apiClient.get("/client");
};

export const getClientWithContact = async (param?: any) => {
  if (param) {
    return await apiClient.get(`/client/contact-person?id=${param}`);
  }
  return await apiClient.get(`/client/contact-person`);
};
