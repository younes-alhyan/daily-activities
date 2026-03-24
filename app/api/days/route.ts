import { httpResponse } from "@/lib/http/httpResponse";
import { httpRoute } from "@/lib/http/httpRoute";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";
import { daysResponses } from "@/features/days";
import { daysControllers } from "@/app/api/days/controllers";

export const GET = httpRoute(async (req) => {
  const userId = authMiddleware(req);
  const data = await daysControllers.get(userId);
  return httpResponse.success(daysResponses.get(data));
});

export const POST = httpRoute(async (req) => {
  const userId = authMiddleware(req);
  const activities = await req.json();
  const data = await daysControllers.add(userId, activities);
  return httpResponse.success(daysResponses.add(data));
});
