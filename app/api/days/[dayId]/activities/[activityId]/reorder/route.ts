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
    const { newIndex } = await req.json();
    await ActivityController.reorder(
      userId,
      dayId,
      activityId,
      newIndex,
    );
    return httpResponse.success(Responses.activity.reorder());
  },
);
