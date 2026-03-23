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

type ActivityRoute<T extends Record<"update" | "delete" | "reorder", unknown>> =
  T;

export type ActivityEndpoints = ActivityRoute<{
  update: ApiEndpoint<
    { accessToken: string; dayId: string; activityId: string },
    { body: Partial<ActivityInput> },
    ActivityDTO
  >;
  delete: ApiEndpoint<{
    accessToken: string;
    dayId: string;
    activityId: string;
  }>;
  reorder: ApiEndpoint<
    { accessToken: string; dayId: string; activityId: string },
    { body: { newIndex: number } }
  >;
}>;

export type ActivityRequests = ActivityRoute<{
  update: ApiRequestConstructor<ActivityEndpoints["update"]>;
  delete: ApiRequestConstructor<ActivityEndpoints["delete"]>;
  reorder: ApiRequestConstructor<ActivityEndpoints["reorder"]>;
}>;

export type ActivityResponses = ActivityRoute<{
  update: ApiResponseConstructor<ActivityEndpoints["update"]>;
  delete: ApiResponseConstructor<ActivityEndpoints["delete"]>;
  reorder: ApiResponseConstructor<ActivityEndpoints["reorder"]>;
}>;

export type ActivityHooks = ActivityRoute<{
  update: ApiHookConstructor<ActivityEndpoints["update"]>;
  delete: ApiHookConstructor<ActivityEndpoints["delete"]>;
  reorder: ApiHookConstructor<ActivityEndpoints["reorder"]>;
}>;
