import { useMutation } from "@tanstack/react-query";
import { deleteWarrantyPlan } from "../services/warrantyPlan.service";
import { queryClient } from "../utils/react-query/queryClient";

export const useDeleteWarrantyPlan = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await deleteWarrantyPlan(params);
      } catch (error) {
        console.log("delete model error", error);
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["warrantyPlans"] }),
  });
};
