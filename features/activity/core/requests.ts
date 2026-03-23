import type { ActivityRequests } from "@/features/activity/types";

export const activityRequests: ActivityRequests = {
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
};
