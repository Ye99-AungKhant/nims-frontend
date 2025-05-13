import { apiClient } from "../utils/axios/apiClient";

export const createUserByAdmin = async (params: any) => {
  return await apiClient.post("/user/create-by-admin", params);
};

export const getUsers = async (params: any) => {
  console.log(params);

  return await apiClient.get("/user", {
    params: {
      pageIndex: params.pageIndex,
      pageSize: params.pageSize,
      search: params.search,
    },
  });
};

export const updateUserByAdmin = async (params: any) => {
  return await apiClient.patch("/user/update-by-admin", params);
};

export const deleteUserByAdmin = async (id: any) => {
  return await apiClient.delete(`/user/${id}`);
};
