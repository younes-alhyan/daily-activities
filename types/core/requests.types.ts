import type { ApiRequest } from "@/types/api/api.types";
import type { Routes } from "@/types/api/routes.types";
import type { ActivityInput } from "@/types/modules/activity.types";
import type { UserInput } from "@/types/modules/user.types";

type AuthRequests = {
  signup: (args: { body: UserInput }) => ApiRequest<false, UserInput>;
  login: (args: { body: UserInput }) => ApiRequest<false, UserInput>;
  refresh: () => ApiRequest;
};

type UserRequests = {
  get: (args: { accessToken: string }) => ApiRequest<true>;
  update: (args: {
    accessToken: string;
    body: Partial<UserInput>;
  }) => ApiRequest<true, Partial<UserInput>>;
  delete: (args: { accessToken: string }) => ApiRequest<true>;
};

type DaysRequests = {
  get: (args: { accessToken: string }) => ApiRequest<true>;
  day: {
    add: (args: {
      accessToken: string;
      body: ActivityInput[];
    }) => ApiRequest<true, ActivityInput[]>;
    delete: (args: { accessToken: string; dayId: string }) => ApiRequest<true>;
  };
};

type ActivitiesRequests = {
  add: (args: {
    accessToken: string;
    dayId: string;
    body: ActivityInput;
  }) => ApiRequest<true, ActivityInput>;
  activity: {
    update: (args: {
      accessToken: string;
      dayId: string;
      activityId: string;
      body: Partial<ActivityInput>;
    }) => ApiRequest<true, Partial<ActivityInput>>;
    delete: (args: {
      accessToken: string;
      dayId: string;
      activityId: string;
    }) => ApiRequest<true>;
    reorder: (args: {
      accessToken: string;
      dayId: string;
      activityId: string;
      body: { newIndex: number };
    }) => ApiRequest<true, { newIndex: number }>;
  };
};

export type RequestsRoutes = Routes<{
  auth: AuthRequests;
  user: UserRequests;
  days: DaysRequests;
  activities: ActivitiesRequests;
}>;
