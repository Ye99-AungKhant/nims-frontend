import { useMutation } from "@tanstack/react-query";
import { updatePeripheralReplacement } from "../../services/repairReplacement.service";
import { queryClient } from "../../utils/react-query/queryClient";

export const useUpdatePeripheralReplacement = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      try {
        return await updatePeripheralReplacement(data);
      } catch (error) {
        console.log("update peripheral replacement error", error);
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getPeripheralReplacementHistory"],
      }),
  });
};
