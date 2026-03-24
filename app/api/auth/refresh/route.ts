import { httpResponse } from "@/lib/http/httpResponse";
import { httpRoute } from "@/lib/http/httpRoute";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";
import { authResponses } from "@/features/auth";
import { authControllers } from "@/app/api/auth/controllers";

export const POST = httpRoute(async (req) => {
  const userId = authMiddleware(req, true);
  const { accessToken, refreshToken } = authControllers.refresh(userId);
  return httpResponse.success(
    authResponses.refresh({ accessToken }),
    refreshToken,
  );
});
