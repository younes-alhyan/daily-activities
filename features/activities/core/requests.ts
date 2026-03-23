import type { ActivitiesRequests } from "@/features/activities/types";

export const activitiesRequests: ActivitiesRequests = {
  add: ({ accessToken, dayId, body }) => ({
    method: "POST",
    url: `/api/days/${dayId}/activities`,
    accessToken,
    body,
  }),
};
