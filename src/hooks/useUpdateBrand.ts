import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/react-query/queryClient";
import { updateBrand } from "../services/brand.service";

export const useUpdateBrand = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await updateBrand(params);
      } catch (error) {
        console.log("update brand error", error);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["brands"] }),
  });
};
