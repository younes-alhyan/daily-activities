import { cleanUser } from "@/lib/utils/cleanObject";
import { Errors } from "@/lib/utils/errors";
import { toObjectId } from "@/lib/utils/toObjectId";
import { userServices } from "@/app/api/user/services";
import type { UserInput, UserDTO } from "@/modules/types/user.types";

const getUser = async (id: string): Promise<UserDTO> => {
  const doc = await userServices.get(toObjectId(id));
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

  const doc = await userServices.update(toObjectId(id), updateData);
  return cleanUser(doc);
};

const deleteUser = (id: string): Promise<void> =>
  userServices.delete(toObjectId(id));

export const userControllers = {
  get: getUser,
  update: updateUser,
  delete: deleteUser,
};
