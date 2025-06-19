import { useQuery } from "@tanstack/react-query";
import { getFullHistory } from "../../services/repairReplacement.service";

export const useGetFulltHistory = (gpsDeviceId: number) => {
  return useQuery({
    queryKey: ["FullHistory"],
    queryFn: async () => {
      return await getFullHistory(gpsDeviceId);
    },
    select: (res) => res.data?.data,
  });
};
