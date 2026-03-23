import type { ApiEndpoint } from "@/types/api.types";
import type {
  ApiRequestConstructor,
  ApiResponseConstructor,
  ApiHookConstructor,
} from "@/types/core.types";
import type { UserInput, UserDTO } from "@/modules/types/user.types";

type UserRoute<T extends Record<"get" | "update" | "delete", unknown>> = T;

export type UserEndpoints = UserRoute<{
  get: ApiEndpoint<{ accessToken: string }, null, UserDTO>;
  update: ApiEndpoint<
    { accessToken: string },
    { body: Partial<UserInput> },
    UserDTO
  >;
  delete: ApiEndpoint<{ accessToken: string }>;
}>;

export type UserRequests = UserRoute<{
  get: ApiRequestConstructor<UserEndpoints["get"]>;
  update: ApiRequestConstructor<UserEndpoints["update"]>;
  delete: ApiRequestConstructor<UserEndpoints["delete"]>;
}>;

export type UserResponses = UserRoute<{
  get: ApiResponseConstructor<UserEndpoints["get"]>;
  update: ApiResponseConstructor<UserEndpoints["update"]>;
  delete: ApiResponseConstructor<UserEndpoints["delete"]>;
}>;

export type UserHooks = UserRoute<{
  get: ApiHookConstructor<UserEndpoints["get"]>;
  update: ApiHookConstructor<UserEndpoints["update"]>;
  delete: ApiHookConstructor<UserEndpoints["delete"]>;
}>;
