import { useMutation } from "@tanstack/react-query";
import { updateWarrantyPlan } from "../services/warrantyPlan.service";
import { queryClient } from "../utils/react-query/queryClient";

export const useUpdateWarrantyPlan = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await updateWarrantyPlan(params);
      } catch (error) {
        console.log("update warranty error", error);
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["warrantyPlans"] }),
  });
};
