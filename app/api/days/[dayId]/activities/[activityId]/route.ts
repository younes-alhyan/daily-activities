import { httpResponse } from "@/lib/http/httpResponse";
import { httpRoute } from "@/lib/http/httpRoute";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";
import { activityResponses } from "@/features/activity";
import { activityControllers } from "@/app/api/days/[dayId]/activities/[activityId]/controllers";

export const PATCH = httpRoute(async (req, params) => {
  const userId = authMiddleware(req);
  const { dayId, activityId } = params;
  const { type, description, state } = await req.json();
  const data = await activityControllers.update(
    userId,
    dayId,
    activityId,
    type,
    description,
    state,
  );
  return httpResponse.success(activityResponses.update(data));
});

export const DELETE = httpRoute(async (req, params) => {
  const userId = authMiddleware(req);
  const { dayId, activityId } = params;
  await activityControllers.delete(userId, dayId, activityId);
  return httpResponse.success(activityResponses.delete());
});
