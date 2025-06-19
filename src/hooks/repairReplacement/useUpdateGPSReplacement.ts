import { useMutation } from "@tanstack/react-query";
import { updateGPSReplacement } from "../../services/repairReplacement.service";
import { queryClient } from "../../utils/react-query/queryClient";

export const useUpdateGPSReplacement = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      try {
        return await updateGPSReplacement(data);
      } catch (error) {
        console.log("update gps replacement error", error);
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getGPSReplacementHistory"] }),
  });
};
