import { httpRoute } from "@/lib/http/httpRoute";
import { Responses } from "@/lib/core/responses";
import { httpResponse } from "@/lib/http/httpResponse";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";
import { DayController } from "@/server/controllers/day.controller";

export const GET = httpRoute(async (req) => {
  const userId = authMiddleware(req);
  const data = await DayController.get(userId);
  return httpResponse.success(Responses.day.get(data));
});

export const POST = httpRoute(async (req) => {
  const userId = authMiddleware(req);
  const activities = await req.json();
  const data = await DayController.add(userId, activities);
  return httpResponse.success(Responses.day.add(data));
});
