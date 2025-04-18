import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/react-query/queryClient";
import { updateType } from "../services/type.service";

export const useUpdateType = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await updateType(params);
      } catch (error) {
        console.log("update type error", error);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["types"] }),
  });
};
