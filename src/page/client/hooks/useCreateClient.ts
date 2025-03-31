import { useMutation } from "@tanstack/react-query";
import { createClient } from "../../../services/client.service";

export const useCreateClient = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await createClient(params);
      } catch (error) {
        console.log("create client error", error);
      }
    },
  });
};
