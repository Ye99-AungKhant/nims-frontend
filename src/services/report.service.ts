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
