import { httpRoute } from "@/lib/http/httpRoute";
import { Responses } from "@/lib/core/responses";
import { httpResponse } from "@/lib/http/httpResponse";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";
import { ActivityController } from "@/server/controllers/activity.controller";

export const POST = httpRoute<"dayId">(async (req, options) => {
  const userId = authMiddleware(req);
  const { type, description, state } = await req.json();
  const dayId = options.params.dayId;
  const data = await ActivityController.add(
    userId,
    dayId,
    type,
    description,
    state,
  );
  return httpResponse.success(Responses.activities.add(data));
});
