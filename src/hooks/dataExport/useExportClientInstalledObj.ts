import { useMutation } from "@tanstack/react-query";
import { useGetRouteParams } from "../useGetRouteParams";
import { exportClientInstalledObject } from "../../services/dataExport.service";

export const useExportClientInstalledObj = () => {
  const {
    pageIndex,
    pageSize,
    search,
    filter_by_date,
    filter_by,
    fromDate,
    toDate,
    client_id,
  } = useGetRouteParams();

  return useMutation({
    mutationFn: async () => {
      const response = await exportClientInstalledObject({
        filterByExpireDate: "",
        pageIndex,
        pageSize,
        search,
        filter_by_date,
        filter_by,
        fromDate,
        toDate,
        client_id,
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "installed_objects.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      return response;
    },
  });
};
