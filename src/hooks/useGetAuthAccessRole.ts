import { useQuery } from "@tanstack/react-query";
import { getAuthAccessRole } from "../services/role.service";
import { mapAuthAccessRoleListToEntity } from "../utils/mappers/role";

export const useGetAuthAccessRole = () => {
  return useQuery({
    queryKey: ["authRoles"],
    queryFn: async () => {
      return await getAuthAccessRole();
    },
    select: (res) => ({
      totalCount: res?.data?.data.totalCount || 0,
      totalPage: res?.data?.data.totalPages || 0,
      items: res?.data?.data.roles.map(mapAuthAccessRoleListToEntity),
    }),
  });
};
