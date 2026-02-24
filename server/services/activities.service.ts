import { Types } from "mongoose";
import { runService } from "@/lib/db";
import { Errors } from "@/lib/core/errors";
import { UserActivitiesModel } from "@/server/models/user-activities.model";
import type {
  UserActivitiesDoc,
  ActivityInput,
} from "@/types/user-activities.types";

const addActivities = (userId: Types.ObjectId, activities: ActivityInput[]) =>
  runService(async () => {
    const doc = await UserActivitiesModel.findOneAndUpdate(
      { userId },
      { $push: { userActivities: { activities } } },
      { new: true },
    );
    if (!doc) throw Errors.NOT_FOUND_ERROR("User activities not found");

    return doc.toObject<UserActivitiesDoc>().userActivities[
      doc.userActivities.length - 1
    ];
  });

const deleteActivities = (
  userId: Types.ObjectId,
  activitiesId: Types.ObjectId,
) =>
  runService(async () => {
    const doc = await UserActivitiesModel.findOneAndUpdate(
      { userId },
      { $pull: { userActivities: { _id: activitiesId } } },
    );
    if (!doc) throw Errors.NOT_FOUND_ERROR("User activities not found");
  });

export const ActivitiesService = {
  add: addActivities,
  delete: deleteActivities,
};
