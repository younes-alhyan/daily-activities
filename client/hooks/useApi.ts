"use client";
import { useState } from "react";
import { ApiError, Errors } from "@/lib/utils/errors";
import type { Func } from "@/types/helpers.types";
import type { ApiResponse, ApiHook, ApiEndpoint } from "@/types/api.types";
import type { ApiRequestConstructor } from "@/types/core.types";

export const useApi = <
  T extends ApiEndpoint<object | null, object | null, object | null>,
  PreResultT = void,
>(props: {
  hookArgs?: T["HookArgsT"];
  requestConstructor: ApiRequestConstructor<T>;
  requestHandler: <DataT = T["DataT"]>(
    request: ReturnType<ApiRequestConstructor<T>>,
  ) => Promise<ApiResponse<true, DataT>>;
  preCallBack?: (args: T["ArgsT"]) => PreResultT;
  postCallBack?: (args: {
    args: T["ArgsT"] & PreResultT;
    data: T["DataT"];
  }) => void;
}): ApiHook<T["InputArgsT"], T["DataT"]> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiResponse<false> | null>(null);
  const clearError = () => setError(null);
  const {
    hookArgs,
    requestConstructor,
    requestHandler,
    preCallBack,
    postCallBack,
  } = props;

  const call = (async (args?: T["InputArgsT"]) => {
    const allArgs = {
      ...(hookArgs ?? {}),
      ...(args ?? {}),
    } as NonNullable<T["ArgsT"]>;

    const preCallBackResult = preCallBack?.(allArgs) as PreResultT;
    setIsLoading(true);
    clearError();

    try {
      const request = requestConstructor(allArgs) as ReturnType<
        ApiRequestConstructor<T>
      >;
      const res = await requestHandler(request);

      if ("data" in res && postCallBack) {
        postCallBack({
          args: { ...allArgs, ...preCallBackResult },
          data: res.data,
        });
      }

      return res;
    } catch (error: unknown) {
      if (error instanceof ApiError) setError(error.response);
      else setError(Errors.CLIENT_RUNTIME_ERROR().response);
    } finally {
      setIsLoading(false);
    }
  }) as Func<
    T["InputArgsT"],
    Promise<ApiResponse<true, T["DataT"]> | undefined>
  >;

  return { isLoading, error, clearError, call };
};
