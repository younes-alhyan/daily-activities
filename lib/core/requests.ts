import { RequestsRoutes } from "@/types/requests.types";

export const Requests: RequestsRoutes = {
  auth: {
    signup: ({ body }) => ({
      method: "POST",
      url: "/api/auth/signup",
      body,
    }),
    login: ({ body }) => ({
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
    get: ({ accessToken }) => ({
      method: "GET",
      url: "/api/user",
      accessToken,
    }),
    update: ({ accessToken, body }) => ({
      method: "PATCH",
      url: "/api/user",
      accessToken,
      body,
    }),
    delete: ({ accessToken }) => ({
      method: "DELETE",
      url: "/api/user",
      accessToken,
    }),
  },

  days: {
    get: ({ accessToken }) => ({
      method: "GET",
      url: "/api/days",
      accessToken,
    }),
    day: {
      add: ({ accessToken, body }) => ({
        method: "POST",
        url: "/api/days",
        accessToken,
        body,
      }),

      delete: ({ accessToken, dayId }) => ({
        method: "DELETE",
        url: `/api/days/${dayId}`,
        accessToken,
      }),
    },
  },

  activities: {
    add: ({ accessToken, dayId, body }) => ({
      method: "POST",
      url: `/api/days/${dayId}/activities`,
      accessToken,
      body,
    }),

    activity: {
      update: ({ accessToken, dayId, activityId, body }) => ({
        method: "PATCH",
        url: `/api/days/${dayId}/activities/${activityId}`,
        accessToken,
        body,
      }),
      reorder: ({ accessToken, dayId, activityId, body }) => ({
        method: "PATCH",
        url: `/api/days/${dayId}/activities/${activityId}/reorder`,
        accessToken,
        body,
      }),
      delete: ({ accessToken, dayId, activityId }) => ({
        method: "DELETE",
        url: `/api/days/${dayId}/activities/${activityId}`,
        accessToken,
      }),
    },
  },
};
