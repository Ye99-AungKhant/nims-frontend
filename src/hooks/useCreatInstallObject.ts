import { useMutation } from "@tanstack/react-query";
import { createInstallObject } from "../services/installObject.service";

export const useCreateInstallObject = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await createInstallObject(params);
      } catch (error) {
        console.log("createForm error", error);
      }
    },
  });
};
