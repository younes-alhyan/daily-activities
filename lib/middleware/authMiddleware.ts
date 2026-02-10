import jwt from "jsonwebtoken";

export function authMiddleware(authHeader: string) {
  if (!authHeader?.startsWith("Bearer ")) return false;
  const token = authHeader.replace("Bearer ", "");

  try {
    jwt.verify(token, process.env.TOKEN_SECRET!);
    return true;
  } catch (err) {
    return false;
  }
}
