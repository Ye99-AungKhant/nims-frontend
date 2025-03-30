import { useQuery } from "@tanstack/react-query";
import { getWarrantyPlan } from "../../../services/warrantyPlan.service";

export const useGetWarrantyPlans = () => {
  return useQuery({
    queryKey: ["warrantyPlans"],
    queryFn: async () => {
      return await getWarrantyPlan();
    },
  });
};
