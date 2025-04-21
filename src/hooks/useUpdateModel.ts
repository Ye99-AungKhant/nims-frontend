import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/react-query/queryClient";
import { updateModel } from "../services/model.service";

export const useUpdateModel = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await updateModel(params);
      } catch (error) {
        console.log("update model error", error);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["models"] }),
  });
};
