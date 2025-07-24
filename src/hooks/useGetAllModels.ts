import { useQuery } from "@tanstack/react-query";
import { getAllModel } from "../services/model.service";

export const useGetAllModels = (type_group: string) => {
  return useQuery({
    queryKey: ["models", type_group],
    queryFn: async () => {
      return await getAllModel(type_group);
    },
  });
};
