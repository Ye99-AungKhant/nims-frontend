import { useMutation } from "@tanstack/react-query";
import { createInstallObject } from "../services/installObject.service";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

export const useCreateInstallObject = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await createInstallObject(params);
      } catch (error) {
        console.log("createForm error", error);
      }
    },
    onSuccess: (data: any) => {
      if (data?.status === 200 || data?.status === 201) {
        navigate("/installed");

        notifications.show({
          title: "Success",
          message: data.data.message,
          color: "green",
        });
      } else {
        notifications.show({
          title: "Failed",
          message: "Failed to create install object.",
          color: "red",
        });
      }
    },
    onError: () => {
      notifications.show({
        title: "Failed",
        message: "Failed to create install object.",
        color: "red",
      });
    },
  });
};
