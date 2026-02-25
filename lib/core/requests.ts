import type { RequestsRoutes } from "@/types/routes.types";

export const Requests: RequestsRoutes = {
  auth: {
    signup: (body) => ({
      method: "POST",
      url: "/api/auth/signup",
      body,
    }),
    login: (body) => ({
      method: "POST",
      url: "/api/auth/login",
      body,
    }),
    refresh: () => ({
      method: "POST",
      url: "/api/auth/refresh",
    }),
  },
  user: {
    get: (token) => ({
      method: "GET",
      url: "/api/user",
      token,
    }),
    update: (token, body) => ({
      method: "PATCH",
      url: "/api/user",
      token,
      body,
    }),
    delete: (token) => ({
      method: "DELETE",
      url: "/api/user",
      token,
    }),
  },
  userActivities: {
    get: (token) => ({
      method: "GET",
      url: "/api/user-activities",
      token,
    }),
  },
  activities: {
    add: (token, body) => ({
      method: "POST",
      url: "/api/activities",
      token,
      body,
    }),
    delete: (token, activitiesId) => ({
      method: "DELETE",
      url: `/api/activities/${activitiesId}`,
      token,
    }),
  },
  activity: {
    add: (token, activitiesId, body) => ({
      method: "POST",
      url: `/api/activities/${activitiesId}/activity`,
      token,
      body,
    }),
    update: (token, activitiesId, activityId, body) => ({
      method: "PATCH",
      url: `/api/activities/${activitiesId}/activity/${activityId}`,
      token,
      body,
    }),
    reorder: (token, activitiesId, activityId, body) => ({
      method: "PATCH",
      url: `/api/activities/${activitiesId}/activity/${activityId}/reorder`,
      token,
      body,
    }),
    delete: (token, activitiesId, activityId) => ({
      method: "DELETE",
      url: `/api/activities/${activitiesId}/activity/${activityId}`,
      token,
    }),
  },
};
