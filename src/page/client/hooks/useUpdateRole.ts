import { useMutation } from "@tanstack/react-query";
import { updateRole } from "../../../services/role.service";
import { queryClient } from "../../../utils/react-query/queryClient";

export const useUpdateRole = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await updateRole(params);
      } catch (error) {
        console.log("update role error", error);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["roles"] }),
  });
};
