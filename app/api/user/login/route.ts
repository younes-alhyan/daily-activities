import { httpRoute } from "@/lib/http/httpRoute";
import { httpResponse } from "@/lib/http/httpResponse";
import { loginUserController } from "@/server/controllers/user.controller";
import type { UserLoginResponse } from "@/types/api.types";

export const POST = httpRoute(async (req: Request) => {
  const { username, password } = await req.json();
  const data = await loginUserController({ username, password });
  return httpResponse<UserLoginResponse>({
    ok: true,
    status: 200,
    message: "Login successful",
    data,
  });
});
