import { useMutation } from "@tanstack/react-query";
import { updateInstallObject } from "../services/installObject.service";
import { queryClient } from "../utils/react-query/queryClient";

export const useUpdateInstalledObject = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await updateInstallObject(params);
      } catch (error) {
        console.log("update install object error", error);
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getInstalled"] }),
  });
};
