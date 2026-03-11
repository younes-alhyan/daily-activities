import type { ApiRequest, ApiResponse } from "@/types/api.types";
import type { UserInput, UserDTO } from "@/types/user.types";
import type { ActivityInput, ActivityDTO, DayDTO } from "@/types/day.types";

// Auth Routes
type AuthRequestsRoutes = {
  signup: (body: UserInput) => ApiRequest<false, UserInput>;
  login: (body: UserInput) => ApiRequest<false, UserInput>;
  refresh: () => ApiRequest;
};
type AuthResponsesRoutes = {
  signup: () => ApiResponse<true>;
  login: (data: { token: string }) => ApiResponse<true, { token: string }>;
  refresh: (data: { token: string }) => ApiResponse<true, { token: string }>;
};

// User Routes
type UserRequestsRoutes = {
  get: (token: string) => ApiRequest<true>;
  update: (
    token: string,
    body: Partial<UserInput>,
  ) => ApiRequest<true, Partial<UserInput>>;
  delete: (token: string) => ApiRequest<true>;
};
type UserResponsesRoutes = {
  get: (data: UserDTO) => ApiResponse<true, UserDTO>;
  update: (data: UserDTO) => ApiResponse<true, UserDTO>;
  delete: () => ApiResponse<true>;
};

// Day Routes
type DayRequestsRoutes = {
  get: (token: string) => ApiRequest<true>;
  add: (
    token: string,
    body: ActivityInput[],
  ) => ApiRequest<true, ActivityInput[]>;
  delete: (token: string, dayId: string) => ApiRequest<true>;
};
type DayResponsesRoutes = {
  get: (data: DayDTO[]) => ApiResponse<true, DayDTO[]>;
  add: (data: DayDTO) => ApiResponse<true, DayDTO>;
  delete: () => ApiResponse<true>;
};

// Activity Routes
type ActivityRequestsRoutes = {
  add: (
    token: string,
    dayId: string,
    body: ActivityInput,
  ) => ApiRequest<true, ActivityInput>;
  update: (
    token: string,
    dayId: string,
    activityId: string,
    body: Partial<ActivityInput>,
  ) => ApiRequest<true, Partial<ActivityInput>>;
  reorder: (
    token: string,
    dayId: string,
    activityId: string,
    body: { newIndex: number },
  ) => ApiRequest<true, { newIndex: number }>;
  delete: (
    token: string,
    dayId: string,
    activityId: string,
  ) => ApiRequest<true>;
};
type ActivityResponsesRoutes = {
  add: (data: ActivityDTO) => ApiResponse<true, ActivityDTO>;
  update: (data: ActivityDTO) => ApiResponse<true, ActivityDTO>;
  reorder: () => ApiResponse<true>;
  delete: () => ApiResponse<true>;
};

// Routes
export type RequestsRoutes = {
  auth: AuthRequestsRoutes;
  user: UserRequestsRoutes;
  day: DayRequestsRoutes;
  activity: ActivityRequestsRoutes;
};
export type ResponseRoutes = {
  auth: AuthResponsesRoutes;
  user: UserResponsesRoutes;
  day: DayResponsesRoutes;
  activity: ActivityResponsesRoutes;
};
