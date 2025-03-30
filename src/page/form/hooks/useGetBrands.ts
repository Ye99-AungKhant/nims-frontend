import { useQuery } from "@tanstack/react-query";
import { getBrand } from "../../../services/brand.service";

export const useGetBrands = (type_group: string) => {
  return useQuery({
    queryKey: ["brands", type_group],
    queryFn: async () => {
      return await getBrand(type_group);
    },
  });
};
