import { useMutation } from "@tanstack/react-query";
import { createContact } from "../../../services/contact.service";
import { queryClient } from "../../../utils/react-query/queryClient";

export const useCreateContact = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await createContact(params);
      } catch (error) {
        console.log("create contact error", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientswithcontact"] });
    },
  });
};
