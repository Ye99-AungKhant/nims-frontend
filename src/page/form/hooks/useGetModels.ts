import { useQuery } from "@tanstack/react-query";
import { getModel } from "../../../services/model.service";

export const useGetModels = (type_group: string, brand_id?: number) => {
  return useQuery({
    queryKey: ["models", type_group, brand_id],
    queryFn: async () => {
      return await getModel(type_group, brand_id);
    },
  });
};
