import type { DayResponses } from "@/features/day/types";

export const dayResponses: DayResponses = {
  delete: () => ({
    ok: true,
    status: 200,
    message: "Activities deleted successfully",
  }),
};
