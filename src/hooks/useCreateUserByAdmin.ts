import { useMutation } from "@tanstack/react-query";
import { createUserByAdmin } from "../services/user.service";
import { queryClient } from "../utils/react-query/queryClient";

export const useCreateUserByAdmin = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await createUserByAdmin(params);
      } catch (error) {
        console.log("create user error", error);
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] }),
  });
};
