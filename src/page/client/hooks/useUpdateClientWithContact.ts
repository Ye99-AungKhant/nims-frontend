import { useMutation } from "@tanstack/react-query";
import { updateClientWithContact } from "../../../services/client.service";
import { queryClient } from "../../../utils/react-query/queryClient";

export const useUpdateClientWithContact = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await updateClientWithContact(params);
      } catch (error) {
        console.log("update client error", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientswithcontact"] });
    },
  });
};
