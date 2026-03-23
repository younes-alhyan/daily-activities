import type { ApiEndpoint } from "@/types/api.types";
import type {
  ApiRequestConstructor,
  ApiResponseConstructor,
  ApiHookConstructor,
} from "@/types/core.types";
import type { ActivityInput } from "@/modules/types/activity.types";
import type { DayDTO } from "@/modules/types/day.types";

type DaysRoute<T extends Record<"get" | "add", unknown>> = T;

export type DaysEndpoints = DaysRoute<{
  get: ApiEndpoint<{ accessToken: string }, null, DayDTO[]>;
  add: ApiEndpoint<{ accessToken: string }, { body: ActivityInput[] }, DayDTO>;
}>;

export type DaysRequests = DaysRoute<{
  get: ApiRequestConstructor<DaysEndpoints["get"]>;
  add: ApiRequestConstructor<DaysEndpoints["add"]>;
}>;

export type DaysResponses = DaysRoute<{
  get: ApiResponseConstructor<DaysEndpoints["get"]>;
  add: ApiResponseConstructor<DaysEndpoints["add"]>;
}>;

export type DaysHooks = DaysRoute<{
  get: ApiHookConstructor<DaysEndpoints["get"]>;
  add: ApiHookConstructor<DaysEndpoints["add"], { tempId: string }>;
}>;
