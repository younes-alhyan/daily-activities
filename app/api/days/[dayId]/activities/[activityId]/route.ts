import { httpRoute } from "@/lib/http/httpRoute";
import { Responses } from "@/lib/core/responses";
import { httpResponse } from "@/lib/http/httpResponse";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";
import { ActivityController } from "@/server/controllers/activity.controller";

export const PATCH = httpRoute<"dayId" | "activityId">(
  async (req, options) => {
    const userId = authMiddleware(req);
    const dayId = options.params.dayId;
    const activityId = options.params.activityId;
    const { type, description, state } = await req.json();
    const data = await ActivityController.update(
      userId,
      dayId,
      activityId,
      type,
      description,
      state,
    );
    return httpResponse.success(Responses.activity.update(data));
  },
);

export const DELETE = httpRoute<"dayId" | "activityId">(
  async (req, options) => {
    const userId = authMiddleware(req);
    const dayId = options.params.dayId;
    const activityId = options.params.activityId;
    await ActivityController.delete(userId, dayId, activityId);
    return httpResponse.success(Responses.activity.delete());
  },
);
