import { useMutation } from "@tanstack/react-query";
import { createRole } from "../../../services/role.service";
import { queryClient } from "../../../utils/react-query/queryClient";

export const useCreateRole = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await createRole(params);
      } catch (error) {
        console.log("create role error", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["authRoles"] });
    },
  });
};
