import { httpResponse } from "@/lib/http/httpResponse";
import { httpRoute } from "@/lib/http/httpRoute";
import { Responses } from "@/lib/core/responses";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";
import { ActivityController } from "@/server/controllers/activity.controller";

export const PATCH = httpRoute(async (req) => {
  const userId = authMiddleware(req);
  const dayId = req.nextUrl.searchParams.get("dayId")!;
  const activityId = req.nextUrl.searchParams.get("activityId")!;
  const { type, description, state } = await req.json();
  const data = await ActivityController.update(
    userId,
    dayId,
    activityId,
    type,
    description,
    state,
  );
  return httpResponse.success(Responses.activities.activity.update(data));
});

export const DELETE = httpRoute(async (req) => {
  const userId = authMiddleware(req);
  const dayId = req.nextUrl.searchParams.get("dayId")!;
  const activityId = req.nextUrl.searchParams.get("activityId");
  await ActivityController.delete(userId, dayId, activityId);
  return httpResponse.success(Responses.activities.activity.delete());
});
