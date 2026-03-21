import type { Prop, Func, NullMerge } from "@/types/helpers.types";
import type {
  ApiEndpoint,
  ApiRequest,
  ApiResponse,
  ApiHook,
} from "@/types/api.types";

export type ApiRequestConstructor<
  T extends ApiEndpoint<object | null, object | null, object | null>,
> = Func<
  T["ArgsT"],
  ApiRequest<
    "accessToken" extends keyof T["ArgsT"] ? true : false,
    "body" extends keyof T["ArgsT"] ? T["ArgsT"]["body"] : null
  >
>;

export type ApiResponseConstructor<
  T extends ApiEndpoint<object | null, object | null, object | null>,
> = Func<T["DataT"], ApiResponse<true, T["DataT"]>>;

export type ApiHookConstructor<
  T extends ApiEndpoint<object | null, object | null, object | null>,
  PreResultT = void,
> = Func<
  Prop<"hookArgs", T["HookArgsT"]> & {
    requestConstructor: ApiRequestConstructor<T>;
    requestHandler: <DataT = T["DataT"]>(
      request: ReturnType<ApiRequestConstructor<T>>,
    ) => Promise<ApiResponse<true, DataT>>;
    preCallBack?: Func<T["ArgsT"], PreResultT>;
    postCallBack?: Func<
      { args: NullMerge<T["ArgsT"], PreResultT>; data: T["DataT"] },
      void
    >;
  },
  ApiHook<T["InputArgsT"], T["DataT"]>
>;
