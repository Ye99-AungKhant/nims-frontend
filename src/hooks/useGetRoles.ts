import { useQuery } from "@tanstack/react-query";
import { getRole } from "../services/role.service";

export const useGetRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      return await getRole();
    },
  });
};
