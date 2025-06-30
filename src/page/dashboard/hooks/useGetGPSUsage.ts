import { useQuery } from "@tanstack/react-query";
import { getGPSUsage } from "../../../services/dashboard.service";

export const useGetGPSUsage = () => {
  return useQuery({
    queryKey: ["getGPSUsage"],
    queryFn: async () => {
      return await getGPSUsage();
    },
    select: (res) => res?.data?.data.gpsUsage || [],
  });
};
