import { useQueries, useQuery } from "@tanstack/react-query";
import { getAccessoryReplacementHistory } from "../../services/repairReplacement.service";

export const useGetAccessoryReplacementHistory = (gpsDeviceId: number) => {
  // return useQueries({
  //   queries: accessoryIds.map((p: any) => ({
  //     queryKey: ["AccessoryReplacementHistory", p.id],
  //     queryFn: async () => {
  //       return await getAccessoryReplacementHistory(p.id);
  //     },
  //   })),
  //   combine: (res) => {
  //     return {
  //       data: res.map((res) => res.data?.data?.data),
  //       isLoading: res.some((res) => res.isLoading),
  //     };
  //   },
  // });

  return useQuery({
    queryKey: ["AccessoryReplacementHistory"],
    queryFn: async () => {
      return await getAccessoryReplacementHistory(gpsDeviceId);
    },
    select: (res) => res.data?.data,
  });
};
