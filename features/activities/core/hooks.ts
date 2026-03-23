/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "@/client/hooks/useApi";
import type {
  ActivitiesEndpoints,
  ActivitiesHooks,
} from "@/features/activities/types";

export const activitiesHooks: ActivitiesHooks = {
  add: ({
    hookArgs,
    requestConstructor,
    requestHandler,
    preCallBack,
    postCallBack,
  }) =>
    useApi<ActivitiesEndpoints["add"], { tempId: string }>({
      hookArgs,
      requestConstructor,
      requestHandler,
      preCallBack,
      postCallBack,
    }),
};
