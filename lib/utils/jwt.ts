import jwt from "jsonwebtoken";
import { StringValue } from "ms";
import { Errors } from "@/lib/core/errors";

const REFRESH_SECRET = process.env.REFRESH_SECRET as string;
const ACCESS_SECRET = process.env.ACCESS_SECRET as string;

if (!REFRESH_SECRET || !ACCESS_SECRET) {
  console.error("Missing REFRESH_SECRET or ACCESS_SECRET environment variable");
  throw Errors.INTERNAL_SERVER_ERROR();
}

export interface JwtPayload {
  userId: string;
}

const signToken = (userId: string, secret: string, expiresIn: StringValue) =>
  jwt.sign({ userId }, secret, {
    expiresIn: expiresIn,
  });

const verifyToken = (token: string, secret: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string") {
      throw Errors.UNAUTHORIZED_ERROR("Invalid token payload");
    }

    return decoded as JwtPayload;
  } catch (error: unknown) {
    throw Errors.UNAUTHORIZED_ERROR("Invalid or expired token");
  }
};

const RefreshToken = {
  get: (req: Request) => {
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies: Record<string, string> = {};
    cookieHeader.split(";").forEach((cookie) => {
      const [name, ...rest] = cookie.trim().split("=");
      if (!name) return;
      cookies[name] = rest.join("=");
    });

    const token = cookies.refreshToken;
    if (!token) throw Errors.UNAUTHORIZED_ERROR("Refresh token missing");

    return token;
  },
  sign: (userId: string) => signToken(userId, REFRESH_SECRET, "30d"),
  verify: (token: string) => verifyToken(token, REFRESH_SECRET),
};
const AccessToken = {
  get: (req: Request) => {
    const authHeader = req.headers.get("Authorization") || "";
    if (!authHeader?.startsWith("Bearer "))
      throw Errors.UNAUTHORIZED_ERROR("Invalid Authorization header");
    return authHeader.replace("Bearer ", "");
  },
  sign: (userId: string) => signToken(userId, ACCESS_SECRET, "1h"),
  verify: (token: string) => verifyToken(token, ACCESS_SECRET),
};

export const Jwt = {
  refreshToken: RefreshToken,
  accessToken: AccessToken,
};
