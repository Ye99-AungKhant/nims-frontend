import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../../../services/dashboard.service";
import { useGetRouteParams } from "../../../hooks/useGetRouteParams";

export const useGetDashboardData = () => {
  const { year } = useGetRouteParams();
  return useQuery({
    queryKey: ["getDashboardData", year],
    queryFn: async () => {
      return await getDashboardData(year);
    },
    select: (res) => ({
      totalObjects: res?.data?.data.totalObjects || 0,
      totalActiveObjects: res?.data?.data.totalActiveObjects || 0,
      totalExpireSoonObjects: res?.data?.data.totalExpireSoonObjects || 0,
      totalExpiredObjects: res?.data?.data.totalExpiredObjects || 0,
      totalClients: res?.data?.data.totalClients || 0,
      monthlyData: res?.data?.data.monthlyData || [],
    }),
  });
};
