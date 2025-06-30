import { useMutation } from "@tanstack/react-query";
import { vehicleChange } from "../../services/vehicle.service";

export const useVehicleChange = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        return await vehicleChange(params);
      } catch (error) {
        console.log("vehicle change error", error);
      }
    },
  });
};
