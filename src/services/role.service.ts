import { apiClient } from "../utils/axios/apiClient";

export const getRole = async () => {
  return await apiClient.get("/role");
};

export const getAuthAccessRole = async () => {
  return await apiClient.get("/role/auth-access");
};

export const createRole = async (params: any) => {
  return await apiClient.post("/role", params);
};

export const updateRole = async (params: any) => {
  return await apiClient.patch("/role", params);
};

export const assignRolePermission = async (params: any) => {
  return await apiClient.post("/role/permission-assign", params);
};

export const deleteRole = async (id: any) => {
  return await apiClient.delete(`/role/${id}`);
};
