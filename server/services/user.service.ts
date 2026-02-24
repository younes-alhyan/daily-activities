import { Types } from "mongoose";
import { Errors } from "@/lib/core/errors";
import { runService } from "@/lib/db";
import { UserModel } from "@/server/models/user.model";
import { UserActivitiesModel } from "@/server/models/user-activities.model";
import type { UserDoc } from "@/types/user.types";

const getUser = (id: Types.ObjectId) =>
  runService(async () => {
    const doc = await UserModel.findById(id);
    if (!doc) throw Errors.NOT_FOUND_ERROR("User not found");
    return doc.toObject<UserDoc>();
  });

const updateUser = (id: Types.ObjectId, user: Partial<UserDoc>) =>
  runService(async () => {
    const doc = await UserModel.findByIdAndUpdate(id, user, { new: true });
    if (!doc) throw Errors.NOT_FOUND_ERROR("User not found");
    return doc.toObject<UserDoc>();
  });

const deleteUser = (id: Types.ObjectId) =>
  runService(async () => {
    const result = await UserModel.deleteOne({ _id: id });
    if (result.deletedCount === 0)
      throw Errors.NOT_FOUND_ERROR("User not found");

    await UserActivitiesModel.deleteOne({ userId: id });
  });

export const UserService = {
  get: getUser,
  update: updateUser,
  delete: deleteUser,
};
