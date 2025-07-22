import { apiClient } from "../utils/axios/apiClient";

export const exportClientInstalledObject = async (params: any) => {
  return await apiClient.get("/client/export-installed-object", {
    params: {
      filterByExpireDate: params.filterByExpireDate,
      pageIndex: params.pageIndex,
      pageSize: params.pageSize,
      search: params.search,
      filter_by_date: params.filter_by_date,
      filter_by: params.filter_by,
      fromDate: params.fromDate,
      toDate: params.toDate,
      client_id: params.client_id,
    },
    responseType: "blob",
  });
};
