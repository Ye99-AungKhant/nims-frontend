import { useMutation } from "@tanstack/react-query";
import { createWarrantyPlan } from "../services/warrantyPlan.service";
import { queryClient } from "../utils/react-query/queryClient";

export const useCreateWarrantyPlan = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await createWarrantyPlan(params);
      } catch (error) {
        console.log("create warranty error", error);
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["warrantyPlans"] }),
  });
};
