import { httpRoute } from "@/lib/http/httpRoute";
import { Responses } from "@/lib/core/responses";
import { httpResponse } from "@/lib/http/httpResponse";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";
import { UserController } from "@/server/controllers/user.controller";

export const GET = httpRoute(async (req) => {
  const userId = authMiddleware(req);
  const data = await UserController.get(userId);
  return httpResponse.success(Responses.user.get(data));
});

export const PATCH = httpRoute(async (req) => {
  const userId = authMiddleware(req);
  const { username, password } = await req.json();
  const data = await UserController.update(userId, username, password);
  return httpResponse.success(Responses.user.update(data));
});

export const DELETE = httpRoute(async (req) => {
  const userId = authMiddleware(req);
  await UserController.delete(userId);
  return httpResponse.success(Responses.user.delete());
});
