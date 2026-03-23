import type { DaysRequests } from "@/features/days/types";

export const daysRequests: DaysRequests = {
  get: ({ accessToken }) => ({
    method: "GET",
    url: "/api/days",
    accessToken,
  }),

  add: ({ accessToken, body }) => ({
    method: "POST",
    url: "/api/days",
    accessToken,
    body,
  }),
};
