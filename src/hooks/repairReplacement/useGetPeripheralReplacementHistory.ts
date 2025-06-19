import { useQueries, useQuery } from "@tanstack/react-query";
import { getPeripheralReplacementHistory } from "../../services/repairReplacement.service";

export const useGetPeripheralReplacementHistory = (gpsDeviceId: number) => {
  // return useQueries({
  //   queries: peripheralIds.map((p: any) => ({
  //     queryKey: ["getPeripheralReplacementHistory", p.id],
  //     queryFn: async () => {
  //       return await getPeripheralReplacementHistory(p.id);
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
    queryKey: ["getPeripheralReplacementHistory"],
    queryFn: async () => {
      return await getPeripheralReplacementHistory(gpsDeviceId);
    },
    select: (res) => res.data?.data,
  });
};
