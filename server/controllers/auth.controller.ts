import { Jwt } from "@/lib/utils/jwt";
import { Errors } from "@/lib/core/errors";
import { AuthService } from "@/server/services/auth.service";
import type { UserInput } from "@/types/user.types";

const signup = async (username: unknown, password: unknown): Promise<void> => {
  if (typeof username !== "string" || username.trim() === "") {
    throw Errors.BAD_REQUEST_ERROR("Username must be a non-empty string");
  }
  if (typeof password !== "string" || password.trim() === "") {
    throw Errors.BAD_REQUEST_ERROR("Password must be a non-empty string");
  }

  const user: UserInput = {
    username: username.trim(),
    password: password.trim(),
  };

  await AuthService.signup(user);
};

const login = async (
  username: unknown,
  password: unknown,
): Promise<{ accessToken: string; refreshToken: string }> => {
  if (typeof username !== "string" || username.trim() === "") {
    throw Errors.BAD_REQUEST_ERROR("Username must be a non-empty string");
  }
  if (typeof password !== "string" || password.trim() === "") {
    throw Errors.BAD_REQUEST_ERROR("Password must be a non-empty string");
  }

  const user = await AuthService.login({ username, password });
  const accessToken = Jwt.accessToken.sign(user._id.toString());
  const refreshToken = Jwt.refreshToken.sign(user._id.toString());

  return { accessToken, refreshToken };
};
const refresh = (
  userId: string,
): { accessToken: string; refreshToken: string } => {
  const accessToken = Jwt.accessToken.sign(userId);
  const refreshToken = Jwt.refreshToken.sign(userId);
  return { accessToken, refreshToken };
};

export const AuthController = {
  signup,
  login,
  refresh,
};
