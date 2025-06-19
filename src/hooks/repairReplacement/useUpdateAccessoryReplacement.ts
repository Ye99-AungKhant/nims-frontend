import { useMutation } from "@tanstack/react-query";
import { updateAccessoryReplacement } from "../../services/repairReplacement.service";
import { queryClient } from "../../utils/react-query/queryClient";

export const useUpdateAccessoryReplacement = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      try {
        return await updateAccessoryReplacement(data);
      } catch (error) {
        console.log("update accessory replacement error", error);
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["AccessoryReplacementHistory"],
      }),
  });
};
