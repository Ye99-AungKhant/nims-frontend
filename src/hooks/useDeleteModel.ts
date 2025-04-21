import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/react-query/queryClient";
import { deleteModel } from "../services/model.service";

export const useDeleteModel = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await deleteModel(params);
      } catch (error) {
        console.log("delete model error", error);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["models"] }),
  });
};
