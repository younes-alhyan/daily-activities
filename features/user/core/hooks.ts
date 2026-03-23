/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "@/client/hooks/useApi";
import type { UserEndpoints, UserHooks } from "@/features/user/types";

export const userHooks: UserHooks = {
  get: ({
    hookArgs,
    requestConstructor,
    requestHandler,
    preCallBack,
    postCallBack,
  }) =>
    useApi<UserEndpoints["get"]>({
      hookArgs,
      requestConstructor,
      requestHandler,
      preCallBack,
      postCallBack,
    }),
  update: ({
    hookArgs,
    requestConstructor,
    requestHandler,
    preCallBack,
    postCallBack,
  }) =>
    useApi<UserEndpoints["update"]>({
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
    useApi<UserEndpoints["delete"]>({
      hookArgs,
      requestConstructor,
      requestHandler,
      preCallBack,
      postCallBack,
    }),
};
