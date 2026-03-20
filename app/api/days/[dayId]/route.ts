import { httpResponse } from "@/lib/http/httpResponse";
import { httpRoute } from "@/lib/http/httpRoute";
import { Responses } from "@/lib/core/responses";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";
import { DayController } from "@/server/controllers/day.controller";

export const DELETE = httpRoute(async (req) => {
  const userId = authMiddleware(req);
  const dayId = req.nextUrl.searchParams.get("dayId");
  await DayController.delete(userId, dayId);
  return httpResponse.success(Responses.days.day.delete());
});
