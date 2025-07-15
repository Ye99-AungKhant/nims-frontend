import { useMutation } from "@tanstack/react-query";
import { vehicleChange } from "../../services/vehicle.service";
import { notifications } from "@mantine/notifications";

export const useVehicleChange = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await vehicleChange(params);
      } catch (error) {
        console.log("vehicle change error", error);
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
