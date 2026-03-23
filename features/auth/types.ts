import type { ApiEndpoint } from "@/types/api.types";
import type {
  ApiRequestConstructor,
  ApiResponseConstructor,
  ApiHookConstructor,
} from "@/types/core.types";
import type { UserInput } from "@/modules/types/user.types";

type AuthRoute<T extends Record<"signup" | "login" | "refresh", unknown>> = T;

export type AuthEndpoints = AuthRoute<{
  signup: ApiEndpoint<null, { body: UserInput }>;
  login: ApiEndpoint<null, { body: UserInput }, { accessToken: string }>;
  refresh: ApiEndpoint<null, null, { accessToken: string }>;
}>;

export type AuthRequests = AuthRoute<{
  signup: ApiRequestConstructor<AuthEndpoints["signup"]>;
  login: ApiRequestConstructor<AuthEndpoints["login"]>;
  refresh: ApiRequestConstructor<AuthEndpoints["refresh"]>;
}>;

export type AuthResponses = AuthRoute<{
  signup: ApiResponseConstructor<AuthEndpoints["signup"]>;
  login: ApiResponseConstructor<AuthEndpoints["login"]>;
  refresh: ApiResponseConstructor<AuthEndpoints["refresh"]>;
}>;

export type AuthHooks = AuthRoute<{
  signup: ApiHookConstructor<AuthEndpoints["signup"]>;
  login: ApiHookConstructor<AuthEndpoints["login"]>;
  refresh: ApiHookConstructor<AuthEndpoints["refresh"]>;
}>;
