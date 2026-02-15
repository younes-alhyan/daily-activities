import { toObjectId } from "@/lib/utils/toObjectId";
import { signToken } from "@/lib/utils/jwt";
import { httpErrors } from "@/lib/http/httpErrors";
import {
  addUserService,
  loginUserService,
  updateUserService,
  deleteUserService,
} from "@/server/services/user.service";
import type { UserInterface, UserDoc, User } from "@/types/user.types";
import type { UserResponse, UserLoginLoginResponse } from "@/types/api.types";

const cleanUser = (doc: UserDoc): User => {
  const { _id, username, password } = doc;
  return { id: String(_id), username };
};

export async function addUserController(
  user: UserInterface,
): Promise<UserResponse> {
  if (!user.username || !user.password) {
    throw httpErrors.BAD_REQUEST_ERROR("Username and password are required");
  }

  const doc = await addUserService(user);
  return cleanUser(doc);
}

export async function loginUserController(
  user: UserInterface,
): Promise<UserLoginLoginResponse> {
  if (!user.username || !user.password) {
    throw httpErrors.BAD_REQUEST_ERROR("Username and password are required");
  }

  const doc = await loginUserService(user);
  const token = signToken(String(doc._id));

  return {
    ...cleanUser(doc),
    token,
  };
}

export async function updateUserController(
  id: string,
  user: UserInterface,
): Promise<UserResponse> {
  const updateData: Partial<UserInterface> = {};

  if (user.username) updateData.username = user.username;
  if (user.password) updateData.password = user.password;

  if (Object.keys(updateData).length === 0) {
    throw httpErrors.BAD_REQUEST_ERROR("Username or password is required");
  }

  const doc = await updateUserService(toObjectId(id, "userId"), updateData);

  return cleanUser(doc);
}

export async function deleteUserController(id: string): Promise<void> {
  if (!id) {
    throw httpErrors.BAD_REQUEST_ERROR("User id is required");
  }
  await deleteUserService(toObjectId(id, "userId"));
}
