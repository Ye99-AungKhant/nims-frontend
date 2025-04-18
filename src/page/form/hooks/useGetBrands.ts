import { useQuery } from "@tanstack/react-query";
import { getBrand } from "../../../services/brand.service";

export const useGetBrands = (type_id: number, type_group: string) => {
  return useQuery({
    queryKey: ["brands", type_id, type_group],
    queryFn: async () => {
      return await getBrand(type_id, type_group);
    },
  });
};
