import { Errors } from "@/lib/utils/errors";
import { Jwt } from "@/lib/utils/jwt";
import { authServices } from "@/app/api/auth/services";
import type { UserInput } from "@/modules/types/user.types";

const signup = async (username: unknown, password: unknown) => {
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

  await authServices.signup(user);
};

const login = async (username: unknown, password: unknown) => {
  if (typeof username !== "string" || username.trim() === "") {
    throw Errors.BAD_REQUEST_ERROR("Username must be a non-empty string");
  }
  if (typeof password !== "string" || password.trim() === "") {
    throw Errors.BAD_REQUEST_ERROR("Password must be a non-empty string");
  }

  const user = await authServices.login({ username, password });
  const accessToken = Jwt.accessToken.sign(user._id.toString());
  const refreshToken = Jwt.refreshToken.sign(user._id.toString());

  return { accessToken, refreshToken };
};

const refresh = (userId: string) => {
  const accessToken = Jwt.accessToken.sign(userId);
  const refreshToken = Jwt.refreshToken.sign(userId);
  return { accessToken, refreshToken };
};

export const authControllers = {
  signup,
  login,
  refresh,
};
