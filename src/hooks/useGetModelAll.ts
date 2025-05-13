import { useQueries } from "@tanstack/react-query";
import { getModel } from "../services/model.service";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../utils/types";

export const useGetModelAll = (
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>
) => {
  const allBrandIds = form.values.peripheral
    .flatMap((p) => p.detail.map((d) => d.brand_id))
    .filter(Boolean);

  const uniqueBrandIds = Array.from(new Set(allBrandIds));

  const result = useQueries({
    queries: uniqueBrandIds.map((brandId) => ({
      queryKey: ["models", brandId],
      queryFn: async () => {
        return await getModel("Sensor", Number(brandId));
      },
      enabled: !!brandId,
    })),
  });

  const allPeriModel = result
    .map((q) => q.data?.data?.data)
    .flatMap((obj) => Object.values(obj || {}));

  console.log("useQuery", allPeriModel);
  return allPeriModel;
};
