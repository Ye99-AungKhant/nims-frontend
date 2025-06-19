import { useQuery } from "@tanstack/react-query";
import { getGPSReplacementHistory } from "../../services/repairReplacement.service";

export const useGetGPSReplacementHistory = (gpsDeviceOriginalId: number) => {
  return useQuery({
    queryKey: ["getGPSReplacementHistory"],
    queryFn: async () => {
      return await getGPSReplacementHistory(gpsDeviceOriginalId);
    },
  });
};
