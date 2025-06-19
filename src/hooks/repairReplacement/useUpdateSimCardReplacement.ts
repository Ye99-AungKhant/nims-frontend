import { useMutation } from "@tanstack/react-query";
import { updateSimCardReplacement } from "../../services/repairReplacement.service";
import { queryClient } from "../../utils/react-query/queryClient";

export const useUpdateSimCardReplacement = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      try {
        return await updateSimCardReplacement(data);
      } catch (error) {
        console.log("update simcard replacement error", error);
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getSIMCardReplacementHistory"],
      }),
  });
};
