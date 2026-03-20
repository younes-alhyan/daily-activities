import { httpResponse } from "@/lib/http/httpResponse";
import { httpRoute } from "@/lib/http/httpRoute";
import { Responses } from "@/lib/core/responses";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";
import { ActivityController } from "@/server/controllers/activity.controller";

export const POST = httpRoute(async (req) => {
  const userId = authMiddleware(req);
  const { type, description, state } = await req.json();
  const dayId = req.nextUrl.searchParams.get("dayId");
  const data = await ActivityController.add(
    userId,
    dayId,
    type,
    description,
    state,
  );
  return httpResponse.success(Responses.activities.add(data));
});
