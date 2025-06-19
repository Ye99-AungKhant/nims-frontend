import { useMutation } from "@tanstack/react-query";
import { deleteInstallImage } from "../services/installImage.service";

export const useDeleteInstallImage = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      try {
        return await deleteInstallImage(id);
      } catch (error) {
        console.log("delete photo error", error);
      }
    },
  });
};
