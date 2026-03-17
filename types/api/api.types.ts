type HTTP_METHOD = "GET" | "POST" | "PATCH" | "DELETE";

export type ApiRequest<TokenT extends boolean = false, BodyT = null> = {
  method: HTTP_METHOD;
  url: string;
} & (TokenT extends true ? { accessToken: string } : object) &
  (BodyT extends null ? object : { body: BodyT });

export type ApiResponse<SuccessT extends boolean = false, DataT = null> = {
  ok: SuccessT;
  status: number;
  message: string;
} & (SuccessT extends false
  ? { code: string }
  : DataT extends null
    ? object
    : { data: DataT });

export class ApiError extends Error {
  response: ApiResponse<false>;
  constructor(response: ApiResponse<false>) {
    super(response.message);
    this.name = "ApiError";
    this.response = response;
  }
}

export type ApiHookDef = {
  TokenT: boolean;
  HookArgsT: object | null;
  InputArgsT: object | null;
  DataT: unknown;
};

export type ApiHook<T extends ApiHookDef> = {
  Def: T;
  Hook: {
    isLoading: boolean;
    error: ApiError | null;
    clearError: () => void;
    call: T["InputArgsT"] extends null
      ? () => Promise<ApiResponse<true, T["DataT"]> | undefined>
      : (
          input: T["InputArgsT"],
        ) => Promise<ApiResponse<true, T["DataT"]> | undefined>;
  };
};
