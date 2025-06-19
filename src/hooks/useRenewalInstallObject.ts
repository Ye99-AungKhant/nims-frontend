import { useMutation } from "@tanstack/react-query";
import { renewInstallObject } from "../services/installObject.service";
import { queryClient } from "../utils/react-query/queryClient";

export const useRenewalInstallObject = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await renewInstallObject(params);
      } catch (error) {
        console.log("renewal error", error);
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getInstalled"] }),
  });
};
