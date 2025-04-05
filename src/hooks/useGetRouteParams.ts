import { useParamsHelper } from "./useParamsHelper";

export const useGetRouteParams = () => {
  const { getParams } = useParamsHelper();
  return getParams();
};
