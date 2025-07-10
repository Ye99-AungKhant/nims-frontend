import { useQueries } from "@tanstack/react-query";
import { getBrand } from "../services/brand.service";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../utils/types";

export const useGetBrandAll = (
  brandType: string,
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>
) => {
  const allTypeIds = form.values.peripheral
    .flatMap((p) => p.sensor_type_id)
    .filter(Boolean);

  const uniqueTypeIds = Array.from(new Set(allTypeIds));

  const result = useQueries({
    queries: uniqueTypeIds.map((typeId: any) => ({
      queryKey: ["brands", brandType, typeId],
      queryFn: async () => {
        return await getBrand(brandType, typeId);
      }, // replace with actual function
    })),
  });

  const allPeriBrand = result
    .map((q) => q.data?.data?.data)
    .flatMap((obj) => Object.values(obj || {}));
  return {
    allPeriBrand,
    isLoading: result.some((q) => q.isLoading),
    error: result.find((q) => q.isError)?.error,
    isSuccess: result.every((q) => q.isSuccess),
  };
};
