import { apiClient } from "../utils/axios/apiClient";

export const createInstallObject = async (params: any) => {
  return await apiClient.post("/installObject", params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateInstallObject = async (params: any) => {
  return await apiClient.post("/installObject/update", params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getInstalled = async (params: any) => {
  return await apiClient.get("/installObject", {
    params: {
      filterByExpireDate: params.filterByExpireDate,
      pageIndex: params.pageIndex,
      pageSize: params.pageSize,
      search: params.search,
      filter_by_date: params.filter_by_date,
      filter_by: params.filter_by,
      fromDate: params.fromDate,
      toDate: params.toDate,
      id: params.id,
      client_id: params.client_id,
    },
  });
};

export const renewInstallObject = async (params: any) => {
  return await apiClient.post("/server/renew", params);
};
