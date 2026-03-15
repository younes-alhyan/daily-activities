"use client";
import { useState } from "react";
import { Errors } from "@/lib/core/errors";
import { ApiError } from "@/types/api.types";
import type {
  ApiRequest,
  ApiResponse,
  ApiHookDef,
  ApiHook,
} from "@/types/api.types";

type HookArgs<T extends ApiHookDef> = T["HookArgsT"] extends null
  ? {}
  : T["HookArgsT"];
type InputArgs<T extends ApiHookDef> = T["InputArgsT"] extends null
  ? {}
  : T["InputArgsT"];
type RequestArgs<T extends ApiHookDef> = HookArgs<T> & InputArgs<T>;

type UseApiProps<
  T extends ApiHookDef,
  PreResult = void,
> = (keyof HookArgs<T> extends never ? {} : { hookArgs: HookArgs<T> }) & {
  request: keyof RequestArgs<T> extends never
    ? () => ApiRequest<T["TokenT"], any>
    : (args: RequestArgs<T>) => ApiRequest<T["TokenT"], any>;

  requestHandler: <DataT = T["DataT"]>(
    req: ApiRequest<T["TokenT"], any>,
  ) => Promise<ApiResponse<true, DataT>>;

  preCallBack?: (args: RequestArgs<T>) => PreResult;

  postCallBack?: (data: T["DataT"], args: RequestArgs<T> & PreResult) => void;
};

export const useApi = <T extends ApiHookDef, PreResultT = void>(
  props: UseApiProps<T, PreResultT>,
): ApiHook<T>["Hook"] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const clearError = () => setError(null);
  const { request, requestHandler, preCallBack, postCallBack } = props;

  const call: T["InputArgsT"] extends null
    ? () => Promise<ApiResponse<true, T["DataT"]> | undefined>
    : (
        input: T["InputArgsT"],
      ) => Promise<ApiResponse<true, T["DataT"]> | undefined> = async (
    input?: T["InputArgsT"],
  ) => {
    const allArgs: RequestArgs<T> = {
      ...("hookArgs" in props ? props.hookArgs : {}),
      ...(input ?? ({} as InputArgs<T>)),
    };

    let preCallBackResult = preCallBack?.(allArgs) as PreResultT;
    setIsLoading(true);
    clearError();

    try {
      const res = await requestHandler(request(allArgs));

      if ("data" in res && postCallBack) {
        postCallBack(res.data, { ...allArgs, ...preCallBackResult });
      }

      return res;
    } catch (err: unknown) {
      if (err instanceof ApiError) setError(err);
      else setError(Errors.CLIENT_RUNTIME_ERROR());
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, clearError, call };
};
