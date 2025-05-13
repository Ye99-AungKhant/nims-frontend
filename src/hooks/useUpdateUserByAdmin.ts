import { useMutation } from "@tanstack/react-query";
import { updateUserByAdmin } from "../services/user.service";
import { queryClient } from "../utils/react-query/queryClient";

export const useUpdateUserByAdmin = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await updateUserByAdmin(params);
      } catch (error) {
        console.log("update user error", error);
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] }),
  });
};
