import { useQuery } from "@tanstack/react-query";
import { getPermission } from "../services/permission.service";

export const useGetPermissions = () => {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: async () => {
      return await getPermission();
    },
  });
};
