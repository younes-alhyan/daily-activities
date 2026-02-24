import { Errors } from "@/lib/core/errors";
import { cleanUser } from "@/lib/utils/cleanObject";
import { toObjectId } from "@/lib/utils/toObjectId";
import { UserService } from "@/server/services/user.service";
import type { UserDTO, UserInput } from "@/types/user.types";

const getUser = async (id: string): Promise<UserDTO> => {
  const doc = await UserService.get(toObjectId(id));
  return cleanUser(doc);
};

const updateUser = async (
  id: string,
  username: unknown,
  password: unknown,
): Promise<UserDTO> => {
  const updateData: Partial<UserInput> = {};

  if (typeof username === "string" && username.trim() !== "") {
    updateData.username = username.trim();
  }
  if (typeof password === "string" && password.trim() !== "") {
    updateData.password = password.trim();
  }

  if (Object.keys(updateData).length === 0) {
    throw Errors.BAD_REQUEST_ERROR(
      "At least one of username or password must be provided",
    );
  }

  const doc = await UserService.update(toObjectId(id), updateData);
  return cleanUser(doc);
};

const deleteUser = (id: string): Promise<void> =>
  UserService.delete(toObjectId(id));

export const UserController = {
  get: getUser,
  update: updateUser,
  delete: deleteUser,
};
