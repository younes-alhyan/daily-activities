import type { ApiEndpoint } from "@/types/api.types";
import type {
  ApiRequestConstructor,
  ApiResponseConstructor,
  ApiHookConstructor,
} from "@/types/core.types";
import type {
  ActivityInput,
  ActivityDTO,
} from "@/modules/types/activity.types";

type ActivitiesRoute<T extends Record<"add", unknown>> = T;

export type ActivitiesEndpoints = ActivitiesRoute<{
  add: ApiEndpoint<
    { accessToken: string; dayId: string },
    { body: ActivityInput },
    ActivityDTO
  >;
}>;

export type ActivitiesRequests = ActivitiesRoute<{
  add: ApiRequestConstructor<ActivitiesEndpoints["add"]>;
}>;

export type ActivitiesResponses = ActivitiesRoute<{
  add: ApiResponseConstructor<ActivitiesEndpoints["add"]>;
}>;

export type ActivitiesHooks = ActivitiesRoute<{
  add: ApiHookConstructor<ActivitiesEndpoints["add"], { tempId: string }>;
}>;
