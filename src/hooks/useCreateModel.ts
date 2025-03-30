import { useMutation } from "@tanstack/react-query";
import { createModel } from "../services/model.service";

export const useCreateModel = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await createModel(params);
      } catch (error) {
        console.log("create contact error", error);
      }
    },
  });
};
