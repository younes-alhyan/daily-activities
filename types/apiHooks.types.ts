import type { Routes } from "@/types/routes.types";
import type { ApiHook } from "@/types/api.types";
import type { UserInput, UserDTO } from "@/types/user.types";
import type { ActivityInput, ActivityDTO, DayDTO } from "@/types/day.types";

type AuthHooks = {
  signup: ApiHook<{
    TokenT: false;
    HookArgsT: null;
    InputArgsT: { body: UserInput };
    DataT: null;
  }>;
  login: ApiHook<{
    TokenT: false;
    HookArgsT: null;
    InputArgsT: { body: UserInput };
    DataT: { accessToken: string };
  }>;
  refresh: ApiHook<{
    TokenT: false;
    HookArgsT: null;
    InputArgsT: null;
    DataT: { accessToken: string };
  }>;
};

type UserHooks = {
  get: ApiHook<{
    TokenT: true;
    HookArgsT: { accessToken: string };
    InputArgsT: null;
    DataT: UserDTO;
  }>;
  update: ApiHook<{
    TokenT: true;
    HookArgsT: { accessToken: string };
    InputArgsT: { body: Partial<UserInput> };
    DataT: UserDTO;
  }>;
  delete: ApiHook<{
    TokenT: true;
    HookArgsT: { accessToken: string };
    InputArgsT: null;
    DataT: null;
  }>;
};

type DaysHooks = {
  get: ApiHook<{
    TokenT: true;
    HookArgsT: { accessToken: string };
    InputArgsT: null;
    DataT: DayDTO[];
  }>;
  day: {
    add: ApiHook<{
      TokenT: true;
      HookArgsT: { accessToken: string; body: ActivityInput[] };
      InputArgsT: null;
      DataT: DayDTO;
    }>;
    delete: ApiHook<{
      TokenT: true;
      HookArgsT: { accessToken: string; dayId: string };
      InputArgsT: null;
      DataT: null;
    }>;
  };
};

type ActivitiesHooks = {
  add: ApiHook<{
    TokenT: true;
    HookArgsT: {
      accessToken: string;
      dayId: string;
      body: ActivityInput;
    };
    InputArgsT: null;
    DataT: ActivityDTO;
  }>;
  activity: {
    update: ApiHook<{
      TokenT: true;
      HookArgsT: {
        accessToken: string;
        dayId: string;
      };
      InputArgsT: {
        activityId: string;
        body: Partial<ActivityInput>;
      };
      DataT: ActivityDTO;
    }>;
    delete: ApiHook<{
      TokenT: true;
      HookArgsT: { accessToken: string; dayId: string };
      InputArgsT: { activityId: string };
      DataT: null;
    }>;
    reorder: ApiHook<{
      TokenT: true;
      HookArgsT: {
        accessToken: string;
        dayId: string;
      };
      InputArgsT: {
        activityId: string;
        body: { newIndex: number };
      };
      DataT: null;
    }>;
  };
};

export type ApiHooksRoutes = Routes<{
  auth: AuthHooks;
  user: UserHooks;
  days: DaysHooks;
  activities: ActivitiesHooks;
}>;
