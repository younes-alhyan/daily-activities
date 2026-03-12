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

  day: {
    get: (token) => ({
      method: "GET",
      url: "/api/days",
      token,
    }),
    add: (token, body) => ({
      method: "POST",
      url: "/api/days",
      token,
      body,
    }),
    delete: (token, dayId) => ({
      method: "DELETE",
      url: `/api/days/${dayId}`,
      token,
    }),
  },

  activity: {
    add: (token, dayId, body) => ({
      method: "POST",
      url: `/api/days/${dayId}/activities`,
      token,
      body,
    }),
    update: (token, dayId, activityId, body) => ({
      method: "PATCH",
      url: `/api/days/${dayId}/activities/${activityId}`,
      token,
      body,
    }),
    reorder: (token, dayId, activityId, body) => ({
      method: "PATCH",
      url: `/api/days/${dayId}/activities/${activityId}/reorder`,
      token,
      body,
    }),
    delete: (token, dayId, activityId) => ({
      method: "DELETE",
      url: `/api/days/${dayId}/activities/${activityId}`,
      token,
    }),
  },
};
