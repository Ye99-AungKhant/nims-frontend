import { useQueries } from "@tanstack/react-query";
import { getBrand } from "../services/brand.service";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../utils/types";

export const useGetBrandAll = (
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>
) => {
  const result = useQueries({
    queries: form.values.peripheral.map((p: any) => ({
      queryKey: ["brands", p.sensor_type_id],
      queryFn: async () => {
        return await getBrand("Sensor", p.sensor_type_id);
      }, // replace with actual function
    })),
  });

  const allPeriBrand = result
    .map((q) => q.data?.data?.data)
    .flatMap((obj) => Object.values(obj || {}));

  console.log("useQuery", allPeriBrand);
  return allPeriBrand;
};
