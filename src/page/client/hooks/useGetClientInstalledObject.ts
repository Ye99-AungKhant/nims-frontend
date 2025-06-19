import { useQuery } from "@tanstack/react-query";
import { getClientInstalledObject } from "../../../services/client.service";

export const useGetClientInstalledObject = (id: any) => {
  return useQuery({
    queryKey: ["clientInstalledObject"],
    queryFn: async () => {
      return await getClientInstalledObject(id);
    },
    select: (res) => ({
      items: res?.data.data,
    }),
  });
};
