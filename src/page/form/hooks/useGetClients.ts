import { useQuery } from "@tanstack/react-query";
import { getClient } from "../../../services/client.service";

export const useGetClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      return await getClient();
    },
  });
};
