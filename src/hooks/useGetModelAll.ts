import { useQueries } from "@tanstack/react-query";
import { getModel } from "../services/model.service";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../utils/types";

export const useGetModelAll = (
  modelType: string,
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>
) => {
  let allBrandIds;

  if (modelType == "Sensor") {
    allBrandIds = form.values.peripheral
      .flatMap((p) => p.detail.map((d) => d.brand_id))
      .filter(Boolean);
  } else if (modelType == "GPS") {
    allBrandIds = form.values?.extraGPS?.map((p) => p.gpsBrand).filter(Boolean);
  }

  const uniqueBrandIds = Array.from(new Set(allBrandIds));

  const result = useQueries({
    queries: uniqueBrandIds.map((brandId) => ({
      queryKey: [modelType, brandId],
      queryFn: async () => {
        return await getModel(modelType, Number(brandId));
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
