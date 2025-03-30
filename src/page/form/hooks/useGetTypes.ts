import { useQuery } from "@tanstack/react-query";
import { getType } from "../../../services/type.service";

export const useGetTypes = (type_group: string) => {
  return useQuery({
    queryKey: ["types", type_group],
    queryFn: async () => {
      return await getType(type_group);
    },
  });
};
