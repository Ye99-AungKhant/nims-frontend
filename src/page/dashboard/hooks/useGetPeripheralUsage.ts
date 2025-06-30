import { useQuery } from "@tanstack/react-query";
import { getPeripheralUsage } from "../../../services/dashboard.service";

export const useGetPeripheralUsage = () => {
  return useQuery({
    queryKey: ["getPeripheralUsage"],
    queryFn: async () => {
      return await getPeripheralUsage();
    },
    select: (res) => res?.data?.data.peripheralUsage || [],
  });
};
