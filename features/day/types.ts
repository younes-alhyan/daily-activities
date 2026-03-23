import type { ApiEndpoint } from "@/types/api.types";
import type {
  ApiRequestConstructor,
  ApiResponseConstructor,
  ApiHookConstructor,
} from "@/types/core.types";

type DayRoute<T extends Record<"delete", unknown>> = T;

export type DayEndpoints = DayRoute<{
  delete: ApiEndpoint<{ accessToken: string; dayId: string }>;
}>;

export type DayRequests = DayRoute<{
  delete: ApiRequestConstructor<DayEndpoints["delete"]>;
}>;

export type DayResponses = DayRoute<{
  delete: ApiResponseConstructor<DayEndpoints["delete"]>;
}>;

export type DayHooks = DayRoute<{
  delete: ApiHookConstructor<DayEndpoints["delete"]>;
}>;
