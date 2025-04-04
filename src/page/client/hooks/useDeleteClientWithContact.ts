import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../utils/react-query/queryClient";
import { deleteClientWithContact } from "../../../services/client.service";

export const useDeleteClientWithContact = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await deleteClientWithContact(params);
      } catch (error) {
        console.log("delete client", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientswithcontact"] });
    },
  });
};
