import { useMutation } from "@tanstack/react-query";
import { renewInstallObject } from "../services/installObject.service";
import { queryClient } from "../utils/react-query/queryClient";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export const useRenewalInstallObject = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await renewInstallObject(params);
      } catch (error) {
        console.log("renewal error", error);
      }
    },
    onSuccess: (data: any) => {
      if (data?.status === 200 || data?.status === 201) {
        notifications.show({
          title: "Success",
          message: data.data.message,
          color: "green",
        });
        queryClient.invalidateQueries({ queryKey: ["getInstalled"] });
      } else {
        notifications.show({
          title: "Failed",
          message: data.data.message,
          color: "red",
        });
      }
    },
  });
};
