import jwt from "jsonwebtoken";
import { Errors } from "@/lib/utils/errors";
import type { StringValue } from "ms";
import type { NextRequest } from "next/server";

const REFRESH_SECRET = process.env.REFRESH_SECRET;
const ACCESS_SECRET = process.env.ACCESS_SECRET;

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
  } catch {
    throw Errors.UNAUTHORIZED_ERROR("Invalid or expired token");
  }
};

const RefreshToken = {
  get: (req: NextRequest) => {
    const refreshToken = req.cookies.get("refreshToken");
    if (refreshToken) return refreshToken.value;
    throw Errors.UNAUTHORIZED_ERROR("Refresh token missing");
  },
  sign: (userId: string) => signToken(userId, REFRESH_SECRET, "30d"),
  verify: (token: string) => verifyToken(token, REFRESH_SECRET),
};
const AccessToken = {
  get: (req: NextRequest) => {
    const authHeader = req.headers.get("Authorization");
    if (authHeader) return authHeader.replace("Bearer ", "");
    throw Errors.UNAUTHORIZED_ERROR("Invalid Authorization header");
  },
  sign: (userId: string) => signToken(userId, ACCESS_SECRET, "1h"),
  verify: (token: string) => verifyToken(token, ACCESS_SECRET),
};

export const Jwt = {
  refreshToken: RefreshToken,
  accessToken: AccessToken,
};
