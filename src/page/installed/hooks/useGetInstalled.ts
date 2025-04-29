import { useQuery } from "@tanstack/react-query";
import { getInstalled } from "../../../services/installObject.service";
import { mapInstalledObjectListToEntity } from "../../../utils/mappers/installedObject";
import { useGetRouteParams } from "../../../hooks/useGetRouteParams";

export const useGetInstalled = (isgetExpire: boolean | "") => {
  const { pageIndex, pageSize, search } = useGetRouteParams();
  return useQuery({
    queryKey: ["getInstalled", pageIndex, pageSize, search],
    queryFn: async () => {
      return await getInstalled({
        filterByExpireDate: isgetExpire,
        pageIndex,
        pageSize,
        search,
      });
    },
    select: (res) => ({
      totalCount: res?.data?.data.totalCount || 0,
      totalPage: res?.data?.data.totalPages || 0,
      items: res?.data?.data?.data.map(mapInstalledObjectListToEntity),
    }),
  });
};
