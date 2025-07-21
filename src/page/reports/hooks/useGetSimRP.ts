import { useQuery } from "@tanstack/react-query";
import { useGetRouteParams } from "../../../hooks/useGetRouteParams";
import { mapSimCardRPListToEntity } from "../../../utils/mappers/simcardRPObject";
import { getSimRP } from "../../../services/report.service";

export const useGetSimRP = () => {
  const {
    operator,
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
      "getSimRP",
      operator,
      pageIndex,
      pageSize,
      search,
      dateFilter,
      filter_by,
      client_id,
    ],
    queryFn: async () => {
      return await getSimRP({
        operator,
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
      items: res?.data?.data?.data.map(mapSimCardRPListToEntity),
    }),
  });
};
