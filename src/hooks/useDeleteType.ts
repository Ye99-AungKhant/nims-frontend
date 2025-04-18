import { useMutation } from "@tanstack/react-query";
import { deleteType } from "../services/type.service";
import { queryClient } from "../utils/react-query/queryClient";

export const useDeleteType = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await deleteType(params);
      } catch (error) {
        console.log("delete type error", error);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["types"] }),
  });
};
