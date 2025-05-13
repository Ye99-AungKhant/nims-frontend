import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/user.service";
import { useGetRouteParams } from "./useGetRouteParams";
import { mapUserListToEntity } from "../utils/mappers/user";

export const useGetAllUsers = () => {
  const { pageIndex, pageSize, search } = useGetRouteParams();
  return useQuery({
    queryKey: ["getAllUsers", pageIndex, pageSize, search],
    queryFn: async () => {
      return await getUsers({ pageIndex, pageSize, search });
    },
    select: (res) => ({
      totalCount: res?.data?.data.totalCount || 0,
      totalPage: res?.data?.data.totalPages || 0,
      items: res?.data?.data.users.map(mapUserListToEntity),
    }),
  });
};
