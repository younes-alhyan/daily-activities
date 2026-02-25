import { Jwt } from "@/lib/utils/jwt";

export const authMiddleware = (req: Request, isRefresh?: true) => {
  const { get, verify } = isRefresh ? Jwt.refreshToken : Jwt.accessToken;
  const token = get(req);
  const payload = verify(token);

  return payload.userId;
};
