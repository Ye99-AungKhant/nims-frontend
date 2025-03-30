import { useMutation } from "@tanstack/react-query";
import { deleteContact } from "../../../services/contact.service";
import { queryClient } from "../../../utils/react-query/queryClient";

export const useDeleteContact = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await deleteContact(params);
      } catch (error) {
        console.log("create contact error", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientswithcontact"] });
    },
  });
};
