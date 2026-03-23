import type { DaysResponses } from "@/features/days/types";

export const daysResponses: DaysResponses = {
  get: (data) => ({
    ok: true,
    status: 200,
    message: "User activities retrieved successfully",
    data,
  }),

  add: (data) => ({
    ok: true,
    status: 201,
    message: "Activities added successfully",
    data,
  }),
};
