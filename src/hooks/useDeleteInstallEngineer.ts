import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/react-query/queryClient";
import { deleteInstallationEngineer } from "../services/installationEngineer.service";

export const useDeleteInstallEngineer = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await deleteInstallationEngineer(params);
      } catch (error) {
        console.log("delete brand error", error);
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["installationEngineers"] }),
  });
};
