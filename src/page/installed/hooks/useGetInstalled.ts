import { useQuery } from "@tanstack/react-query";
import { getInstalled } from "../../../services/installObject.service";
import { mapInstalledObjectListToEntity } from "../../../utils/mappers/installedObject";
import { useGetRouteParams } from "../../../hooks/useGetRouteParams";

export const useGetInstalled = (isgetExpire: boolean | "") => {
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
  const dateFilter =
    filter_by_date && (fromDate || toDate)
      ? { filter_by_date, fromDate, toDate }
      : "";

  return useQuery({
    queryKey: [
      "getInstalled",
      pageIndex,
      pageSize,
      search,
      dateFilter,
      filter_by,
      client_id,
    ],
    queryFn: async () => {
      return await getInstalled({
        filterByExpireDate: isgetExpire,
        pageIndex,
        pageSize,
        search,
        filter_by_date,
        filter_by,
        fromDate,
        toDate,
        client_id,
      });
    },
    select: (res) => ({
      totalCount: res?.data?.data.totalCount || 0,
      totalPage: res?.data?.data.totalPages || 0,
      items: res?.data?.data?.data.map(mapInstalledObjectListToEntity),
    }),
  });
};

export const useGetInstalledDetail = (id: number) => {
  return useQuery({
    queryKey: ["getInstalledDetail"],
    queryFn: async () => {
      return await getInstalled({
        id,
      });
    },
    select: (res) => ({
      items: res?.data?.data?.data[0],
    }),
  });
};
