import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/react-query/queryClient";
import { updateInstallationEngineer } from "../services/installationEngineer.service";

export const useUpdateInstallEngineer = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await updateInstallationEngineer(params);
      } catch (error) {
        console.log("update installation engineer error", error);
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["installationEngineers"] }),
  });
};
