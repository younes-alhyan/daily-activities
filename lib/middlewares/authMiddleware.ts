import { Jwt } from "@/lib/utils/jwt";
import type { NextRequest } from "next/server";

export const authMiddleware = (req: NextRequest, isRefresh?: true) => {
  const { get, verify } = isRefresh ? Jwt.refreshToken : Jwt.accessToken;
  const token = get(req);
  const payload = verify(token);

  return payload.userId;
};
