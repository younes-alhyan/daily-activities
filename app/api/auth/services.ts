import { MongoServerError } from "mongodb";
import { runService } from "@/lib/db";
import { Errors } from "@/lib/utils/errors";
import { DayModel } from "@/modules/models/day.model";
import { UserModel } from "@/modules/models/user.model";
import type { UserInput, UserDoc } from "@/modules/types/user.types";

const signup = (user: UserInput) => {
  return runService(async () => {
    try {
      const doc = await UserModel.create(user);
      await DayModel.create({ userId: doc._id });
    } catch (error: unknown) {
      if (error instanceof MongoServerError && error.code === 11000) {
        throw Errors.INTERNAL_SERVER_ERROR("User Already Exists");
      }
      throw Errors.INTERNAL_SERVER_ERROR("Failed to create user");
    }
  });
};

const login = (user: UserInput) => {
  return runService(async () => {
    const doc = await UserModel.findOne({ username: user.username });
    if (!doc) throw Errors.NOT_FOUND_ERROR("User not found");

    const isMatch = await doc.comparePassword(user.password);
    if (!isMatch) throw Errors.UNAUTHORIZED_ERROR("Invalid password");

    return doc.toObject<UserDoc>();
  });
};

export const authServices = {
  signup,
  login,
};
