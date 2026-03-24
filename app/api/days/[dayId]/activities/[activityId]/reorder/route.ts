import { httpResponse } from "@/lib/http/httpResponse";
import { httpRoute } from "@/lib/http/httpRoute";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";
import { activityResponses } from "@/features/activity";
import { activityControllers } from "@/app/api/days/[dayId]/activities/[activityId]/controllers";

export const PATCH = httpRoute(async (req, params) => {
  const userId = authMiddleware(req);
  const { dayId, activityId } = params;
  const { newIndex } = await req.json();
  await activityControllers.reorder(userId, dayId, activityId, newIndex);
  return httpResponse.success(activityResponses.reorder());
});
