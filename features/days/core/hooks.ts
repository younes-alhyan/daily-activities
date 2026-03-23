/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "@/client/hooks/useApi";
import type { DaysEndpoints, DaysHooks } from "@/features/days/types";

export const daysHooks: DaysHooks = {
  get: ({
    hookArgs,
    requestConstructor,
    requestHandler,
    preCallBack,
    postCallBack,
  }) =>
    useApi<DaysEndpoints["get"]>({
      hookArgs,
      requestConstructor,
      requestHandler,
      preCallBack,
      postCallBack,
    }),
  add: ({
    hookArgs,
    requestConstructor,
    requestHandler,
    preCallBack,
    postCallBack,
  }) =>
    useApi<DaysEndpoints["add"], { tempId: string }>({
      hookArgs,
      requestConstructor,
      requestHandler,
      preCallBack,
      postCallBack,
    }),
};
