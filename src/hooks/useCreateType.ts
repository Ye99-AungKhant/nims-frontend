import { useMutation } from "@tanstack/react-query";
import { createType } from "../services/type.service";
import { queryClient } from "../utils/react-query/queryClient";

export const useCreateType = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await createType(params);
      } catch (error) {
        console.log("create type error", error);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["types"] }),
  });
};
