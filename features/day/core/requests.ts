import type { DayRequests } from "@/features/day/types";

export const dayRequests: DayRequests = {
  delete: ({ accessToken, dayId }) => ({
    method: "DELETE",
    url: `/api/days/${dayId}`,
    accessToken,
  }),
};
