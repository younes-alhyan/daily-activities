import { httpResponse } from "@/lib/http/httpResponse";
import { httpRoute } from "@/lib/http/httpRoute";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";
import { dayResponses } from "@/features/day";
import { dayControllers } from "@/app/api/days/[dayId]/controllers";

export const DELETE = httpRoute(async (req, params) => {
  const userId = authMiddleware(req);
  const { dayId } = params;
  await dayControllers.delete(userId, dayId);
  return httpResponse.success(dayResponses.delete());
});
