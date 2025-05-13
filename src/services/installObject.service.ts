import { apiClient } from "../utils/axios/apiClient";

export const createInstallObject = async (params: any) => {
  return await apiClient.post("/installObject", params);
};

export const updateInstallObject = async (params: any) => {
  return await apiClient.post("/installObject/update", params);
};

export const getInstalled = async (params: any) => {
  return await apiClient.get("/installObject", {
    params: {
      filterByExpireDate: params.filterByExpireDate,
      pageIndex: params.pageIndex,
      pageSize: params.pageSize,
      search: params.search,
      filter_by: params.filter_by,
      fromDate: params.fromDate,
      toDate: params.toDate,
      id: params.id,
    },
  });
};
