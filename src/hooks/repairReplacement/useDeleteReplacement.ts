import { useMutation } from "@tanstack/react-query";
import { deleteReplacement } from "../../services/repairReplacement.service";
import { queryClient } from "../../utils/react-query/queryClient";

export const useDeleteReplacement = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      try {
        return await deleteReplacement({ id });
      } catch (error) {
        console.log("delete replacement error", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getGPSReplacementHistory"] }),
        queryClient.invalidateQueries({
          queryKey: ["AccessoryReplacementHistory"],
        });
      queryClient.invalidateQueries({
        queryKey: ["getPeripheralReplacementHistory"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getSIMCardReplacementHistory"],
      });
    },
  });
};
