import { useMutation } from "@tanstack/react-query";
import { createFormSubmit } from "../../../services/createForm.service";

export const useCreateFormSubmit = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await createFormSubmit(params);
      } catch (error) {
        console.log("createForm error", error);
      }
    },
  });
};
