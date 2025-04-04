import { apiClient } from "../utils/axios/apiClient";

export const createClient = async (params: any) => {
  return await apiClient.post("/client", { ...params });
};

export const createClientWithContact = async (params: any) => {
  return await apiClient.post("/client/createClientWithContact", { ...params });
};

export const getClient = async () => {
  return await apiClient.get("/client");
};

export const getClientWithContact = async (param?: any) => {
  if (param) {
    return await apiClient.get(`/client/contact-person?id=${param}`);
  }
  return await apiClient.get(`/client/contact-person`);
};

export const updateClientWithContact = async (params: any) => {
  return await apiClient.post("/client/update", { ...params });
};

export const deleteClientWithContact = async (params: any) => {
  return await apiClient.delete(`/client/delete/${params}`);
};
