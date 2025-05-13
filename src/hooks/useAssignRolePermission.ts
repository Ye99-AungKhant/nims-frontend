import { useMutation } from "@tanstack/react-query";
import { assignRolePermission } from "../services/role.service";

export const useAssignRolePermission = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await assignRolePermission(params);
      } catch (error) {
        console.log("create contact error", error);
      }
    },
  });
};
