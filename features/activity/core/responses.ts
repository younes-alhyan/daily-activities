import type { ActivityResponses } from "@/features/activity/types";

export const activityResponses: ActivityResponses = {
  update: (data) => ({
    ok: true,
    status: 200,
    message: "Activity updated successfully",
    data,
  }),
  reorder: () => ({
    ok: true,
    status: 200,
    message: "Activity reordered successfully",
  }),
  delete: () => ({
    ok: true,
    status: 200,
    message: "Activity deleted successfully",
  }),
};
