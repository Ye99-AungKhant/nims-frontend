import { useMutation } from "@tanstack/react-query";
import { createReplacement } from "../../services/repairReplacement.service";

export const useReplacement = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await createReplacement(params);
      } catch (error) {
        console.log("replacement error", error);
      }
    },
  });
};
