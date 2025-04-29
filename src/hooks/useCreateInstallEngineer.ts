import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/react-query/queryClient";
import { createInstallationEngineer } from "../services/installationEngineer.service";

export const useCreateInstallationEngineer = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        const data = { name: params };
        return await createInstallationEngineer(data);
      } catch (error) {
        console.log("create install engineer error", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["installationEngineers"] });
    },
  });
};
