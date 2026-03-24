import { httpResponse } from "@/lib/http/httpResponse";
import { httpRoute } from "@/lib/http/httpRoute";
import { authResponses } from "@/features/auth";
import { authControllers } from "@/app/api/auth/controllers";

export const POST = httpRoute(async (req) => {
  const { username, password } = await req.json();
  await authControllers.signup(username, password);
  return httpResponse.success(authResponses.signup());
});
