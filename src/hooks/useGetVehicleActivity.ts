import { useQuery } from "@tanstack/react-query";
import { vehicleActivity } from "../services/vehicle.service";

export const useGetVehicleActivity = (id: number) => {
  return useQuery({
    queryKey: ["vehicleActivityList", id],
    queryFn: async () => {
      return await vehicleActivity(id);
    },
    select: (data) => {
      return data.data;
    },
  });
};
