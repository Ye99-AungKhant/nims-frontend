import { apiClient } from "../utils/axios/apiClient";

export const getSimRP = async (params: any) => {
  return await apiClient.get("/report/simcard", {
    params: {
      operator: params.operator,
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

export const getAccessoryRP = async (params: any) => {
  return await apiClient.get("/report/accessory", {
    params: {
      type_id: params.type_id,
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

export const getGPSRP = async (params: any) => {
  return await apiClient.get("/report/gps-device", {
    params: {
      filterType: params.filterType,
      filterId: params.filterId,
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

export const getPeripheralRP = async (params: any) => {
  return await apiClient.get("/report/peripheral", {
    params: {
      filterType: params.filterType,
      filterId: params.filterId,
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
