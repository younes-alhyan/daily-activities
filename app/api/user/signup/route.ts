import { httpRoute } from "@/lib/http/httpRoute";
import { httpResponse } from "@/lib/http/httpResponse";
import { addUserController } from "@/server/controllers/user.controller";
import type { UserResponse } from "@/types/api.types";

export const POST = httpRoute(async (req: Request) => {
  const { username, password } = await req.json();
  const data = await addUserController({ username, password });
  return httpResponse<UserResponse>({
    ok: true,
    status: 201,
    message: "User created successfully",
    data,
  });
});
