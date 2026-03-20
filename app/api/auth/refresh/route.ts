import { httpResponse } from "@/lib/http/httpResponse";
import { httpRoute } from "@/lib/http/httpRoute";
import { Responses } from "@/lib/core/responses";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";
import { AuthController } from "@/server/controllers/auth.controller";

export const POST = httpRoute(async (req) => {
  const userId = authMiddleware(req, true);
  const { accessToken, refreshToken } = AuthController.refresh(userId);
  return httpResponse.success(
    Responses.auth.refresh({ accessToken }),
    refreshToken,
  );
});
