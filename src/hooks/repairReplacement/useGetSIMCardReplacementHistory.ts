import { useQueries, useQuery } from "@tanstack/react-query";
import { getSIMCardReplacementHistory } from "../../services/repairReplacement.service";

export const useGetSIMCardReplacementHistory = (gpsDeviceId: number) => {
  // return useQueries({
  //   queries: gpsDeviceId.map((p: any) => ({
  //     queryKey: ["getSIMCardReplacementHistory", p.id],
  //     queryFn: async () => {
  //       return await getSIMCardReplacementHistory(p.id);
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
    queryKey: ["getSIMCardReplacementHistory"],
    queryFn: async () => {
      return await getSIMCardReplacementHistory(gpsDeviceId);
    },
    select: (res) => res.data?.data,
  });
};
