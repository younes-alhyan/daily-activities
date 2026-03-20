import { httpResponse } from "@/lib/http/httpResponse";
import { httpRoute } from "@/lib/http/httpRoute";
import { Responses } from "@/lib/core/responses";
import { AuthController } from "@/server/controllers/auth.controller";

export const POST = httpRoute(async (req) => {
  const { username, password } = await req.json();
  const { accessToken, refreshToken } = await AuthController.login(
    username,
    password,
  );
  return httpResponse.success(
    Responses.auth.login({ accessToken }),
    refreshToken,
  );
});
