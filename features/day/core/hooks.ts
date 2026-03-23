/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "@/client/hooks/useApi";
import type { DayEndpoints, DayHooks } from "@/features/day/types";

export const dayHooks: DayHooks = {
  delete: ({
    hookArgs,
    requestConstructor,
    requestHandler,
    preCallBack,
    postCallBack,
  }) =>
    useApi<DayEndpoints["delete"]>({
      hookArgs,
      requestConstructor,
      requestHandler,
      preCallBack,
      postCallBack,
    }),
};
