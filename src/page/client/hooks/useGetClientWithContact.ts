import { useQuery } from "@tanstack/react-query";
import { getClientWithContact } from "../../../services/client.service";
import { mapClientListToEntity } from "../../../utils/mappers/client";
import { useGetRouteParams } from "../../../hooks/useGetRouteParams";

export const useGetClientsWithContact = () => {
  const { pageIndex, pageSize } = useGetRouteParams();
  return useQuery({
    queryKey: ["clientswithcontact", pageIndex, pageSize],
    queryFn: async () => {
      return await getClientWithContact({ pageIndex, pageSize });
    },
    select: (res) => ({
      totalCount: res?.data?.data.totalCount || 0,
      items: res?.data?.data.clients.map(mapClientListToEntity),
    }),
  });
};

export const useGetClientDetailWithContact = (id: any) => {
  return useQuery({
    queryKey: ["clientDetailwithcontact"],
    queryFn: async () => {
      return await getClientWithContact({ id });
    },
    select: (res) => ({
      items: res?.data.data.clients[0],
    }),
  });
};
