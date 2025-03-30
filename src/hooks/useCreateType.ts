import { useMutation } from "@tanstack/react-query";
import { createType } from "../services/type.service";

export const useCreateType = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await createType(params);
      } catch (error) {
        console.log("create contact error", error);
      }
    },
  });
};
