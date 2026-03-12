import { httpRoute } from "@/lib/http/httpRoute";
import { Responses } from "@/lib/core/responses";
import { httpResponse } from "@/lib/http/httpResponse";
import { AuthController } from "@/server/controllers/auth.controller";

export const POST = httpRoute(async (req) => {
  const { username, password } = await req.json();
  await AuthController.signup(username, password);
  return httpResponse.success(Responses.auth.signup());
});
