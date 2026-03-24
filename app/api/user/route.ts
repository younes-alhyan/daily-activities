import { httpResponse } from "@/lib/http/httpResponse";
import { httpRoute } from "@/lib/http/httpRoute";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";
import { userResponses } from "@/features/user";
import { userControllers } from "@/app/api/user/controllers";

export const GET = httpRoute(async (req) => {
  const userId = authMiddleware(req);
  const data = await userControllers.get(userId);
  return httpResponse.success(userResponses.get(data));
});

export const PATCH = httpRoute(async (req) => {
  const userId = authMiddleware(req);
  const { username, password } = await req.json();
  const data = await userControllers.update(userId, username, password);
  return httpResponse.success(userResponses.update(data));
});

export const DELETE = httpRoute(async (req) => {
  const userId = authMiddleware(req);
  await userControllers.delete(userId);
  return httpResponse.success(userResponses.delete());
});
