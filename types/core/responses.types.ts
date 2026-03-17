import type { ApiResponse } from "@/types/api/api.types";
import type { Routes } from "@/types/api/routes.types";
import type { ActivityDTO } from "@/types/modules/activity.types";
import type { DayDTO } from "@/types/modules/day.types";
import type { UserDTO } from "@/types/modules/user.types";

type AuthResponses = {
  signup: () => ApiResponse<true>;
  login: (data: {
    accessToken: string;
  }) => ApiResponse<true, { accessToken: string }>;
  refresh: (data: {
    accessToken: string;
  }) => ApiResponse<true, { accessToken: string }>;
};

type UserResponses = {
  get: (data: UserDTO) => ApiResponse<true, UserDTO>;
  update: (data: UserDTO) => ApiResponse<true, UserDTO>;
  delete: () => ApiResponse<true>;
};

type DaysResponses = {
  get: (data: DayDTO[]) => ApiResponse<true, DayDTO[]>;
  day: {
    add: (data: DayDTO) => ApiResponse<true, DayDTO>;
    delete: () => ApiResponse<true>;
  };
};

type ActivitiesResponses = {
  add: (data: ActivityDTO) => ApiResponse<true, ActivityDTO>;
  activity: {
    update: (data: ActivityDTO) => ApiResponse<true, ActivityDTO>;
    delete: () => ApiResponse<true>;
    reorder: () => ApiResponse<true>;
  };
};

export type ResponsesRoutes = Routes<{
  auth: AuthResponses;
  user: UserResponses;
  days: DaysResponses;
  activities: ActivitiesResponses;
}>;
