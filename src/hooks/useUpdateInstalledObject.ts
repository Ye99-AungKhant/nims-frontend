import { useMutation } from "@tanstack/react-query";
import { updateInstallObject } from "../services/installObject.service";
import { queryClient } from "../utils/react-query/queryClient";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export const useUpdateInstalledObject = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await updateInstallObject(params);
      } catch (error) {
        console.log("update install object error", error);
      }
    },
    onSuccess: (data: any) => {
      if (data?.status === 200 || data?.status === 201) {
        notifications.show({
          title: "Success",
          message: "Install object updated successfully.",
          color: "green",
        });
        queryClient.invalidateQueries({ queryKey: ["getInstalled"] });
        navigate("/installed");
      } else {
        notifications.show({
          title: "Failed",
          message: "Failed to update install object.",
          color: "red",
        });
      }
    },
    onError: () => {
      notifications.show({
        title: "Failed",
        message: "Failed to update install object.",
        color: "red",
      });
    },
  });
};
