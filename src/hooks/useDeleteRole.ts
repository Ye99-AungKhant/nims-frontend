import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/react-query/queryClient";
import { deleteRole } from "../services/role.service";

export const useDeleteRole = () => {
  return useMutation({
    mutationFn: async (id: any) => {
      try {
        return await deleteRole(id);
      } catch (error) {
        console.log("delete role error", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["authRoles"] });
    },
  });
};
