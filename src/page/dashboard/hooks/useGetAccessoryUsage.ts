import { useQuery } from "@tanstack/react-query";
import { getAccessoryUsage } from "../../../services/dashboard.service";

export const useGetAccessoryUsage = () => {
  return useQuery({
    queryKey: ["getAccessoryUsage"],
    queryFn: async () => {
      return await getAccessoryUsage();
    },
    select: (res) => res?.data?.data.accessoryTypeUsage || [],
  });
};
