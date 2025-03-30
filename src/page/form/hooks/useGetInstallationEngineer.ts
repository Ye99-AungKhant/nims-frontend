import { useQuery } from "@tanstack/react-query";
import { getInstallationEngineer } from "../../../services/installationEngineer.service";

export const useGetInstallationEngineers = () => {
  return useQuery({
    queryKey: ["installationEngineers"],
    queryFn: async () => {
      return await getInstallationEngineer();
    },
  });
};
