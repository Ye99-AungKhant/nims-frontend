import { useMutation } from "@tanstack/react-query";
import { createClientWithContact } from "../../../services/client.service";

export const useCreateClientWithContact = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await createClientWithContact(params);
      } catch (error) {
        console.log("create client error", error);
      }
    },
  });
};
