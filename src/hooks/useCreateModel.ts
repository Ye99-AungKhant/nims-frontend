import { useMutation } from "@tanstack/react-query";
import { createModel } from "../services/model.service";
import { queryClient } from "../utils/react-query/queryClient";

export const useCreateModel = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await createModel(params);
      } catch (error) {
        console.log("create contact error", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });
};
