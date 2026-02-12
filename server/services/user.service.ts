import { Types } from "mongoose";
import { connectDB } from "@/lib/db/connect";
import { UserModel } from "@/server/models/user.model";
import { UserActivitiesModel } from "@/server/models/userActivities.model";
import { INTERNAL_SERVER_ERROR } from "@/types/error.types";

export async function addUserService(username: string, password: string) {
  await connectDB();

  try {
    const user = await UserModel.create({ username, password });

    await UserActivitiesModel.create({
      userId: user._id,
      userActivities: [],
    });

    return user;
  } catch (error) {
    console.error(error);
    throw INTERNAL_SERVER_ERROR();
  }
}

export async function loginUserService(username: string) {
  await connectDB();

  try {
    return await UserModel.findOne({ username });
  } catch (error) {
    console.error(error);
    throw INTERNAL_SERVER_ERROR();
  }
}

export async function updateUserService(
  id: Types.ObjectId,
  username: string,
  password: string,
) {
  await connectDB();

  try {
    const user = await UserModel.findById(id);
    if (!user) return null;

    user.username = username;
    user.password = password;
    await user.save();

    return user;
  } catch (error) {
    console.error(error);
    throw INTERNAL_SERVER_ERROR();
  }
}

export async function deleteUserService(id: Types.ObjectId) {
  await connectDB();

  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (user) {
      await UserActivitiesModel.findOneAndDelete({ userId: id });
    }

    return user;
  } catch (error) {
    console.error(error);
    throw INTERNAL_SERVER_ERROR();
  }
}
