import { useMutation } from "@tanstack/react-query";
import { getClient } from "../services/client.service";

export const useGetClients = () => {
  return useMutation({
    mutationFn: async (param: any) => {
      try {
        return await getClient(param);
      } catch (error) {
        console.log("update client error", error);
      }
    },
  });
};
