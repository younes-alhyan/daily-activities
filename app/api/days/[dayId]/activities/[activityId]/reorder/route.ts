import { httpResponse } from "@/lib/http/httpResponse";
import { httpRoute } from "@/lib/http/httpRoute";
import { Responses } from "@/lib/core/responses";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";
import { ActivityController } from "@/server/controllers/activity.controller";

export const PATCH = httpRoute(async (req) => {
  const userId = authMiddleware(req);
  const dayId = req.nextUrl.searchParams.get("dayId")!;
  const activityId = req.nextUrl.searchParams.get("activityId");
  const { newIndex } = await req.json();
  await ActivityController.reorder(userId, dayId, activityId, newIndex);
  return httpResponse.success(Responses.activities.activity.reorder());
});
