/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "@/client/hooks/useApi";
import type {
  ActivityEndpoints,
  ActivityHooks,
} from "@/features/activity/types";

export const activityHooks: ActivityHooks = {
  update: ({
    hookArgs,
    requestConstructor,
    requestHandler,
    preCallBack,
    postCallBack,
  }) =>
    useApi<ActivityEndpoints["update"]>({
      hookArgs,
      requestConstructor,
      requestHandler,
      preCallBack,
      postCallBack,
    }),
  delete: ({
    hookArgs,
    requestConstructor,
    requestHandler,
    preCallBack,
    postCallBack,
  }) =>
    useApi<ActivityEndpoints["delete"]>({
      hookArgs,
      requestConstructor,
      requestHandler,
      preCallBack,
      postCallBack,
    }),
  reorder: ({
    hookArgs,
    requestConstructor,
    requestHandler,
    preCallBack,
    postCallBack,
  }) =>
    useApi<ActivityEndpoints["reorder"]>({
      hookArgs,
      requestConstructor,
      requestHandler,
      preCallBack,
      postCallBack,
    }),
};
