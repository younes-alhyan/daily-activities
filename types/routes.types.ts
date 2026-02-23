import type { ApiRequest, ApiResponse } from "@/types/api.types";
import type { UserInput, UserDTO } from "@/types/user.types";
import type {
  ActivityInput,
  ActivityDTO,
  ActivitiesDTO,
} from "@/types/user-activities.types";

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

// User Activities Routes
type UserActivitiesRequestsRoutes = {
  get: (token: string) => ApiRequest<true>;
};
type UserActivitiesResponsesRoutes = {
  get: (data: ActivitiesDTO[]) => ApiResponse<true, ActivitiesDTO[]>;
};

// Activities Routes
type ActivitiesRequestsRoutes = {
  add: (
    token: string,
    body: ActivityInput[],
  ) => ApiRequest<true, ActivityInput[]>;
  delete: (token: string, activitiesId: string) => ApiRequest<true>;
};
type ActivitiesResponsesRoutes = {
  add: (data: ActivitiesDTO) => ApiResponse<true, ActivitiesDTO>;
  delete: () => ApiResponse<true>;
};

// Activity Routes
type ActivityRequestsRoutes = {
  add: (
    token: string,
    activitiesId: string,
    body: ActivityInput,
  ) => ApiRequest<true, ActivityInput>;
  update: (
    token: string,
    activitiesId: string,
    activityId: string,
    body: Partial<ActivityInput>,
  ) => ApiRequest<true, Partial<ActivityInput>>;
  reorder: (
    token: string,
    activitiesId: string,
    activityId: string,
    body: { newIndex: number },
  ) => ApiRequest<true, { newIndex: number }>;
  delete: (
    token: string,
    activitiesId: string,
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
  userActivities: UserActivitiesRequestsRoutes;
  activities: ActivitiesRequestsRoutes;
  activity: ActivityRequestsRoutes;
};
export type ResponseRoutes = {
  auth: AuthResponsesRoutes;
  user: UserResponsesRoutes;
  userActivities: UserActivitiesResponsesRoutes;
  activities: ActivitiesResponsesRoutes;
  activity: ActivityResponsesRoutes;
};
