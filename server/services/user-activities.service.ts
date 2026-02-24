import { Types } from "mongoose";
import { Errors } from "@/lib/core/errors";
import { runService } from "@/lib/db";
import { UserActivitiesModel } from "@/server/models/user-activities.model";
import type { UserActivitiesDoc } from "@/types/user-activities.types";

const getUserActivities = (userId: Types.ObjectId) =>
  runService(async () => {
    const activities = await UserActivitiesModel.findOne({ userId });
    if (!activities) throw Errors.NOT_FOUND_ERROR("User activities not found");
    return activities.toObject<UserActivitiesDoc>();
  });

export const UserActivitiesService = {
  get: getUserActivities,
};
