import { useMutation } from "@tanstack/react-query";
import { createRepair } from "../../services/repairReplacement.service";

export const useCreateRepair = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await createRepair(params);
      } catch (error) {
        console.log("repair error", error);
      }
    },
  });
};
