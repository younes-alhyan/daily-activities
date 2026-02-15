import jwt from "jsonwebtoken";
import { httpErrors } from "@/lib/http/httpErrors";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  console.error("Missing JWT_SECRET environment variable");
  throw httpErrors.INTERNAL_SERVER_ERROR();
}

export interface JwtPayload {
  userId: string;
}

export const signToken = (userId: string) =>
  jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

export const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
      throw httpErrors.UNAUTHORIZED_ERROR("Invalid token payload");
    }

    return decoded as JwtPayload;
  } catch {
    throw httpErrors.UNAUTHORIZED_ERROR("Invalid or expired token");
  }
};
