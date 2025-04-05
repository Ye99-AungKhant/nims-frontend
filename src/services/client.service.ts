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

export const getClientWithContact = async (params: any) => {
  if (params.id) {
    return await apiClient.get(`/client/contact-person?id=${params.id}`);
  }
  return await apiClient.get(`/client/contact-person`, {
    params: { pageIndex: params.pageIndex, pageSize: params.pageSize },
  });
};

export const updateClientWithContact = async (params: any) => {
  return await apiClient.post("/client/update", { ...params });
};

export const deleteClientWithContact = async (params: any) => {
  return await apiClient.delete(`/client/delete/${params}`);
};
