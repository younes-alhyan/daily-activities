import { httpResponse } from "@/lib/http/httpResponse";
import { httpRoute } from "@/lib/http/httpRoute";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";
import { activitiesResponses } from "@/features/activities";
import { activitiesControllers } from "@/app/api/days/[dayId]/activities/controllers";

export const POST = httpRoute(async (req, params) => {
  const userId = authMiddleware(req);
  const { type, description, state } = await req.json();
  const { dayId } = params;
  const data = await activitiesControllers.add(
    userId,
    dayId,
    type,
    description,
    state,
  );
  return httpResponse.success(activitiesResponses.add(data));
});
