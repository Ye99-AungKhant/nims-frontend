import { useQuery } from "@tanstack/react-query";
import { getAllBrand } from "../services/brand.service";

export const useGetAllBrands = (type_group: string) => {
  return useQuery({
    queryKey: ["brands", type_group],
    queryFn: async () => {
      return await getAllBrand(type_group);
    },
  });
};
