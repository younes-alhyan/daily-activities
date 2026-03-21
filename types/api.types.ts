import type { Prop, Func, NullMerge } from "@/types/helpers.types";

export type ApiEndpoint<HookArgsT = null, InputArgsT = null, DataT = null> = {
  ArgsT: NullMerge<InputArgsT, HookArgsT>;
  HookArgsT: HookArgsT;
  InputArgsT: InputArgsT;
  DataT: DataT;
};

type HTTP_METHOD = "GET" | "POST" | "PATCH" | "DELETE";

export type ApiRequest<TokenT extends boolean = false, BodyT = null> = {
  method: HTTP_METHOD;
  url: string;
} & Prop<"accessToken", TokenT extends false ? null : string> &
  Prop<"body", BodyT>;

export type ApiResponse<SuccessT extends boolean = false, DataT = null> = {
  ok: SuccessT;
  status: number;
  message: string;
} & (SuccessT extends false ? { code: string } : Prop<"data", DataT>);

export type ApiHook<InputArgsT = null, DataT = null> = {
  isLoading: boolean;
  error: ApiResponse<false> | null;
  clearError: () => void;
  call: Func<InputArgsT, Promise<ApiResponse<true, DataT> | undefined>>;
};
