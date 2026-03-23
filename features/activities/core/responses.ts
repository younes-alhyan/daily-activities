import type { ActivitiesResponses } from "@/features/activities/types";

export const activitiesResponses: ActivitiesResponses = {
  add: (data) => ({
    ok: true,
    status: 201,
    message: "Activities added successfully",
    data,
  }),
};
