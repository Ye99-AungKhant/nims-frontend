import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/react-query/queryClient";
import { deleteBrand } from "../services/brand.service";

export const useDeleteBrand = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await deleteBrand(params);
      } catch (error) {
        console.log("delete brand error", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] }),
        queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });
};
