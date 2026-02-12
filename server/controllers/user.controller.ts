import { toObjectId } from "@/lib/utils/toObjectId";
import { signToken } from "@/lib/utils/jwt";
import {
  addUserService,
  loginUserService,
  updateUserService,
  deleteUserService,
} from "@/server/services/user.service";
import {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  UNAUTHORIZED_ERROR,
} from "@/types/error.types";

const cleanUser = (doc: any) => {
  if (!doc) return null;

  const obj =
    doc?.toObject?.({ versionKey: false, getters: false, virtuals: false }) ??
    doc;

  const { _id, password, ...rest } = obj;
  return { id: String(_id), ...rest };
};

export async function addUserController(username: string, password: string) {
  if (!username || !password) {
    throw BAD_REQUEST_ERROR("Username and password are required");
  }

  const doc = await addUserService(username, password);
  return cleanUser(doc);
}

export async function loginUserController(username: string, password: string) {
  if (!username || !password) {
    throw BAD_REQUEST_ERROR("Username and password are required");
  }

  const user = await loginUserService(username);
  if (!user) throw UNAUTHORIZED_ERROR("Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw UNAUTHORIZED_ERROR("Invalid credentials");

  const token = signToken(String(user._id));

  return {
    user: cleanUser(user),
    token,
  };
}

export async function updateUserController(
  id: string,
  username: string,
  password: string,
) {
  if (!username || !password) {
    throw BAD_REQUEST_ERROR("Username and password are required");
  }

  const doc = await updateUserService(
    toObjectId(id, "userId"),
    username,
    password,
  );
  if (!doc) throw NOT_FOUND_ERROR("User not found");

  return cleanUser(doc);
}

export async function deleteUserController(id: string) {
  const doc = await deleteUserService(toObjectId(id, "userId"));
  if (!doc) throw NOT_FOUND_ERROR("User not found");

  return { deleted: true };
}
