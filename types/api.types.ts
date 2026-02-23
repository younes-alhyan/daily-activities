type HTTP_METHOD = "GET" | "POST" | "PATCH" | "DELETE";

export type ApiRequest<TokenT extends boolean = false, BodyT = undefined> = {
  method: HTTP_METHOD;
  url: string;
} & (TokenT extends true ? { token: string } : {}) &
  (BodyT extends undefined ? {} : { body: BodyT });

export type ApiResponse<SuccessT extends boolean = false, DataT = undefined> = {
  ok: SuccessT;
  status: number;
  message: string;
} & (SuccessT extends false
  ? { code: string }
  : DataT extends undefined
    ? {}
    : { data: DataT });
