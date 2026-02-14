import { Types } from "mongoose";
import { connectDB } from "@/lib/db/connect";
import { httpErrors } from "@/lib/http/httpErrors";
import { UserModel } from "@/server/models/user.model";
import { UserActivitiesModel } from "@/server/models/userActivities.model";
import type { UserInterface, UserDoc } from "@/types/user.types";

export async function addUserService(user: UserInterface): Promise<UserDoc> {
  try {
    await connectDB();

    const { username, password } = user;

    const doc = await UserModel.create({ username, password });
    await UserActivitiesModel.create({
      userId: doc._id,
      userActivities: [],
    });

    return doc.toObject<UserDoc>();
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as any).code === 11000
    ) {
      throw httpErrors.CONFLICT_ERROR("Username already exists");
    }

    throw error;
  }
}

export async function loginUserService(user: UserInterface): Promise<UserDoc> {
  await connectDB();

  const { username, password } = user;

  const doc = await UserModel.findOne({ username });
  if (!doc) throw httpErrors.NOT_FOUND_ERROR("User not found");

  const isMatch = await doc.comparePassword(password);
  if (!isMatch) throw httpErrors.UNAUTHORIZED_ERROR("Invalid credentials");

  return doc.toObject<UserDoc>();
}

export async function updateUserService(
  id: Types.ObjectId,
  user: Partial<UserInterface>,
): Promise<UserDoc> {
  await connectDB();

  const { username, password } = user;

  const doc = await UserModel.findById(id);
  if (!doc) throw httpErrors.NOT_FOUND_ERROR("User not found");

  if (username) doc.username = username;
  if (password) doc.password = password;
  await doc.save();

  return doc.toObject<UserDoc>();
}

export async function deleteUserService(id: Types.ObjectId): Promise<void> {
  await connectDB();

  const doc = await UserModel.findByIdAndDelete(id);
  if (!doc) throw httpErrors.NOT_FOUND_ERROR("User not found");

  await UserActivitiesModel.findOneAndDelete({ userId: id });
}
