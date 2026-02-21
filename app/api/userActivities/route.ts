import { httpRoute } from "@/lib/http/httpRoute";
import { httpResponse } from "@/lib/http/httpResponse";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";
import {
  getUserActivitiesController,
  addActivitiesController,
  deleteActivitiesController,
  updateActivitiesController,
} from "@/server/controllers/userActivities.controller";
import type { UserActivitiesResponse } from "@/types/api.types";

export const GET = httpRoute(async (req: Request) => {
  const userId = await authMiddleware(req);
  const data = await getUserActivitiesController(userId);
  return httpResponse<UserActivitiesResponse>({
    ok: true,
    status: 200,
    message: "User activities retrieved successfully",
    data,
  });
});

export const POST = httpRoute(async (req: Request) => {
  const userId = await authMiddleware(req);
  const data = await addActivitiesController(userId);
  return httpResponse<UserActivitiesResponse>({
    ok: true,
    status: 201,
    message: "User activities created successfully",
    data,
  });
});

export const DELETE = httpRoute(async (req: Request) => {
  const userId = await authMiddleware(req);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";
  await deleteActivitiesController(userId, id);
  return httpResponse({
    ok: true,
    status: 200,
    message: "User activities deleted successfully",
  });
});

export const PUT = httpRoute(async (req: Request) => {
  const userId = await authMiddleware(req);
  const { id, activityId, description, state } = await req.json();
  const data = await updateActivitiesController(
    userId,
    id,
    activityId,
    description,
    state,
  );
  return httpResponse<UserActivitiesResponse>({
    ok: true,
    status: 200,
    message: "User activity updated successfully",
    data,
  });
});
