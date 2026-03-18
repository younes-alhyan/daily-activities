import { runService } from "@/lib/db";
import { Errors } from "@/lib/core/errors";
import { DayModel } from "@/server/models/day.model";
import { UserModel } from "@/server/models/user.model";
import type { Types } from "mongoose";
import type { UserDoc } from "@/types/modules/user.types";

const getUser = (id: Types.ObjectId) =>
  runService(async () => {
    const doc = await UserModel.findById(id);
    if (!doc) throw Errors.NOT_FOUND_ERROR("User not found");
    return doc.toObject<UserDoc>();
  });

const updateUser = (id: Types.ObjectId, user: Partial<UserDoc>) =>
  runService(async () => {
    const doc = await UserModel.findById(id);
    if (!doc) throw Errors.NOT_FOUND_ERROR("User not found");

    if (user.username) doc.username = user.username;
    if (user.password) doc.password = user.password;

    await doc.save();
    return doc.toObject<UserDoc>();
  });

const deleteUser = (id: Types.ObjectId) =>
  runService(async () => {
    const result = await UserModel.deleteOne({ _id: id });
    if (result.deletedCount === 0)
      throw Errors.NOT_FOUND_ERROR("User not found");

    await DayModel.deleteMany({ userId: id });
  });

export const UserService = {
  get: getUser,
  update: updateUser,
  delete: deleteUser,
};
