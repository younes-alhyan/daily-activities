import { httpRoute } from "@/lib/http/httpRoute";
import { Responses } from "@/lib/core/responses";
import { httpResponse } from "@/lib/http/httpResponse";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";
import { DayController } from "@/server/controllers/day.controller";

export const DELETE = httpRoute<"dayId">(async (req, options) => {
  const userId = authMiddleware(req);
  const dayId = options.params.dayId;
  await DayController.delete(userId, dayId);
  return httpResponse.success(Responses.day.delete());
});
