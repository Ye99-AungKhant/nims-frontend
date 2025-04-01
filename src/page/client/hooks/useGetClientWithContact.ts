import { useQuery } from "@tanstack/react-query";
import { getClientWithContact } from "../../../services/client.service";
import { mapClientListToEntity } from "../../../utils/mappers/client";

export const useGetClientsWithContact = () => {
  return useQuery({
    queryKey: ["clientswithcontact"],
    queryFn: async () => {
      return await getClientWithContact();
    },
    select: (res) => ({
      totalCount: 0,
      items: res?.data?.data.map(mapClientListToEntity),
    }),
  });
};

export const useGetClientDetailWithContact = (param: any) => {
  return useQuery({
    queryKey: ["clientDetailwithcontact"],
    queryFn: async () => {
      return await getClientWithContact(param);
    },
    select: (res) => ({
      items: res?.data.data[0],
    }),
  });
};
