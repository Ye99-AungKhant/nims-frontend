import { useQuery } from "@tanstack/react-query";
import { getClientList } from "../../../services/client.service";

export const useGetClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      return await getClientList();
    },
  });
};
