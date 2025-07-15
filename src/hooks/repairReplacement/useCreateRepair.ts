import { useMutation } from "@tanstack/react-query";
import { createRepair } from "../../services/repairReplacement.service";
import { notifications } from "@mantine/notifications";

export const useCreateRepair = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await createRepair(params);
      } catch (error) {
        console.log("repair error", error);
      }
    },
    onSuccess: (data: any) => {
      if (data?.status === 200 || data?.status === 201) {
        notifications.show({
          title: "Success",
          message: data.data.message,
          color: "green",
        });
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
