import { Types } from "mongoose";
import { Errors } from "@/lib/core/errors";
import { runService } from "@/lib/db";
import { UserActivitiesModel } from "@/server/models/user-activities.model";
import type {
  UserActivitiesDoc,
  ActivityInput,
} from "@/types/user-activities.types";

const addActivity = (
  userId: Types.ObjectId,
  activitiesId: Types.ObjectId,
  activity: ActivityInput,
) =>
  runService(async () => {
    const doc = await UserActivitiesModel.findOneAndUpdate(
      { userId, "userActivities._id": activitiesId },
      { $push: { "userActivities.$.activities": activity } },
      { new: true },
    );
    if (!doc) throw Errors.NOT_FOUND_ERROR("User activities not found");

    const activties = doc
      .toObject<UserActivitiesDoc>()
      .userActivities.find(
        (activities) => activities._id.toString() === activitiesId.toString(),
      );
    if (!activties) throw Errors.NOT_FOUND_ERROR("Activities not found");

    return activties.activities[activties.activities.length - 1];
  });

const updateActivity = (
  userId: Types.ObjectId,
  activitiesId: Types.ObjectId,
  activityId: Types.ObjectId,
  activity: Partial<ActivityInput>,
) =>
  runService(async () => {
    const userDoc = await UserActivitiesModel.findOne({ userId });
    if (!userDoc) throw Errors.NOT_FOUND_ERROR("User activities not found");

    const activitiesDoc = userDoc.userActivities.find((a) =>
      a._id.equals(activitiesId),
    );
    if (!activitiesDoc) throw Errors.NOT_FOUND_ERROR("Activities not found");

    const activityDoc = activitiesDoc.activities.find((a) =>
      a._id.equals(activityId),
    );
    if (!activityDoc) throw Errors.NOT_FOUND_ERROR("Activity not found");

    Object.assign(activityDoc, activity);
    await userDoc.save();

    return activityDoc;
  });

const reorderActivity = (
  userId: Types.ObjectId,
  activitiesId: Types.ObjectId,
  activityId: Types.ObjectId,
  newIndex: number,
) =>
  runService(async () => {
    const userDoc = await UserActivitiesModel.findOne({ userId });
    if (!userDoc) throw Errors.NOT_FOUND_ERROR("User activities not found");

    const activitiesDoc = userDoc.userActivities.find((a) =>
      a._id.equals(activitiesId),
    );
    if (!activitiesDoc) throw Errors.NOT_FOUND_ERROR("Activities not found");

    const activityIndex = activitiesDoc.activities.findIndex((a) =>
      a._id.equals(activityId),
    );
    if (activityIndex === -1)
      throw Errors.NOT_FOUND_ERROR("Activity not found");

    if (newIndex < 0 || newIndex >= activitiesDoc.activities.length) {
      throw Errors.BAD_REQUEST_ERROR("newIndex out of bounds");
    }

    const [activity] = activitiesDoc.activities.splice(activityIndex, 1);
    activitiesDoc.activities.splice(newIndex, 0, activity);

    await userDoc.save();
  });

const deleteActivity = (
  userId: Types.ObjectId,
  activitiesId: Types.ObjectId,
  activityId: Types.ObjectId,
) =>
  runService(async () => {
    const doc = await UserActivitiesModel.findOneAndUpdate(
      { userId, "userActivities._id": activitiesId },
      { $pull: { "userActivities.$.activities": { _id: activityId } } },
    );
    if (!doc) throw Errors.NOT_FOUND_ERROR("User activities not found");
  });

export const ActivityService = {
  add: addActivity,
  update: updateActivity,
  reorder: reorderActivity,
  delete: deleteActivity,
};
