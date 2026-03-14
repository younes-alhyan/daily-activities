import type { Routes } from "@/types/routes.types";
import type { ApiResponse } from "@/types/api.types";
import type { UserDTO } from "@/types/user.types";
import type { ActivityDTO, DayDTO } from "@/types/day.types";

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
