import { httpRoute } from "@/lib/http/httpRoute";
import { httpResponse } from "@/lib/http/httpResponse";
import { authMiddleware } from "@/lib/middleware/authMiddleware";
import {
  updateUserController,
  deleteUserController,
} from "@/server/controllers/user.controller";
import type { UserResponse } from "@/types/api.types";

export const PUT = httpRoute(async (req: Request) => {
  const userId = await authMiddleware(req);
  const { username, password } = await req.json();
  const data = await updateUserController(userId, { username, password });
  return httpResponse<UserResponse>({
    ok: true,
    status: 200,
    message: "User updated successfully",
    data,
  });
});

export const DELETE = httpRoute(async (req: Request) => {
  const userId = await authMiddleware(req);
  await deleteUserController(userId);
  return httpResponse({
    ok: true,
    status: 200,
    message: "User deleted successfully",
  });
});
