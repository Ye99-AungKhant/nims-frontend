import { useMutation } from "@tanstack/react-query";
import { createRole } from "../../../services/role.service";
import { queryClient } from "../../../utils/react-query/queryClient";

export const useCreateRole = () => {
  return useMutation({
    mutationFn: async (name: any) => {
      try {
        return await createRole({ name });
      } catch (error) {
        console.log("create role error", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};
