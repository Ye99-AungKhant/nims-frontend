import { useMutation } from "@tanstack/react-query";
import { createBrand } from "../services/brand.service";
import { queryClient } from "../utils/react-query/queryClient";

export const useCreateBrand = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await createBrand(params);
      } catch (error) {
        console.log("create contact error", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};
