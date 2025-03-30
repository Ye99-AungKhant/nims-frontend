import { useQuery } from "@tanstack/react-query";
import { getInstalled } from "../../../services/createForm.service";

export const useGetInstalled = (isgetExpire: boolean | "") => {
  return useQuery({
    queryKey: ["getInstalled"],
    queryFn: async () => {
      return await getInstalled(isgetExpire);
    },
  });
};
