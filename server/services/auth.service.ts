import { MongoServerError } from "mongodb";
import { Errors } from "@/lib/core/errors";
import { runService } from "@/lib/db";
import { UserModel } from "@/server/models/user.model";
import { UserActivitiesModel } from "@/server/models/user-activities.model";
import type { UserInput } from "@/types/user.types";

const signup = (user: UserInput) =>
  runService(async () => {
    try {
      const doc = await UserModel.create(user);
      await UserActivitiesModel.create({ userId: doc._id });
    } catch (error: unknown) {
      if (error instanceof MongoServerError && error.code === 11000) {
        throw Errors.INTERNAL_SERVER_ERROR("User Already Exists");
      }
      throw Errors.INTERNAL_SERVER_ERROR("Failed to create user");
    }
  });

const login = (user: UserInput) =>
  runService(async () => {
    const doc = await UserModel.findOne({ username: user.username });
    if (!doc) throw Errors.NOT_FOUND_ERROR("User not found");

    const isMatch = await doc.comparePassword(user.password);
    if (!isMatch) throw Errors.UNAUTHORIZED_ERROR("Invalid password");

    return doc.toObject();
  });

export const AuthService = {
  signup,
  login,
};
