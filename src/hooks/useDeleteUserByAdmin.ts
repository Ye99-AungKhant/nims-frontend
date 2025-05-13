import { useMutation } from "@tanstack/react-query";
import { deleteUserByAdmin } from "../services/user.service";
import { queryClient } from "../utils/react-query/queryClient";

export const useDeleteUserByAdmin = () => {
  return useMutation({
    mutationFn: async (id: any) => {
      try {
        return await deleteUserByAdmin(id);
      } catch (error) {
        console.log("delete user error", error);
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] }),
  });
};
