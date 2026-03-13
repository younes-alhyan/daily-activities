"use client";
import { useState } from "react";
import { ApiError, Errors } from "@/lib/core/errors";
import type { ApiRequest, ApiResponse } from "@/types/api.types";

export interface ApiHook<
  InputArgsT extends Record<string, any> = {},
  DataT = undefined,
> {
  isLoading: boolean;
  error: ApiError | null;
  clearError: () => void;
  call: (
    ...args: keyof InputArgsT extends never ? [] : [input: InputArgsT]
  ) => Promise<ApiResponse<true, DataT> | undefined>;
}

export const useApi = <
  TokenT extends boolean = false,
  HookArgsT extends Record<string, any> = {},
  InputArgsT extends Record<string, any> = {},
  DataT = undefined,
>(
  hookArgs: HookArgsT,
  request: (args: HookArgsT & InputArgsT) => ApiRequest<TokenT, any>,
  requestHandler: <T = DataT>(
    request: ApiRequest<TokenT, any>,
  ) => Promise<ApiResponse<true, T>>,
  postCallBack?: (data: DataT, args: HookArgsT & InputArgsT) => void,
  preCallBack?: (args: HookArgsT & InputArgsT) => void,
): ApiHook<InputArgsT, DataT> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const clearError = () => setError(null);

  const call = async (
    ...args: keyof InputArgsT extends never ? [] : [input: InputArgsT]
  ) => {
    const allArgs = { ...hookArgs, ...(args[0] as InputArgsT) };
    if (preCallBack) preCallBack(allArgs);
    setIsLoading(true);
    clearError();

    try {
      const res = await requestHandler<DataT>(request(allArgs));

      if ("data" in res && postCallBack) {
        postCallBack(res.data, allArgs);
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
