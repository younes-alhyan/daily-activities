/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "@/client/hooks/useApi";
import type { AuthEndpoints, AuthHooks } from "@/features/auth/types";

export const authHooks: AuthHooks = {
  signup: ({ requestConstructor, requestHandler, preCallBack, postCallBack }) =>
    useApi<AuthEndpoints["signup"]>({
      requestConstructor,
      requestHandler,
      preCallBack,
      postCallBack,
    }),
  login: ({ requestConstructor, requestHandler, preCallBack, postCallBack }) =>
    useApi<AuthEndpoints["login"]>({
      requestConstructor,
      requestHandler,
      preCallBack,
      postCallBack,
    }),
  refresh: ({
    requestConstructor,
    requestHandler,
    preCallBack,
    postCallBack,
  }) =>
    useApi<AuthEndpoints["refresh"]>({
      requestConstructor,
      requestHandler,
      preCallBack,
      postCallBack,
    }),
};
