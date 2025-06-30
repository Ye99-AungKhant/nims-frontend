import { useQuery } from "@tanstack/react-query";
import { getSimcardUsage } from "../../../services/dashboard.service";

export const useGetOperatorUsage = () => {
  return useQuery({
    queryKey: ["getOperatorUsage"],
    queryFn: async () => {
      return await getSimcardUsage();
    },
    select: (res) => res?.data?.data.simCardBrandUsage || [],
  });
};
