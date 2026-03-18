import { runService } from "@/lib/db";
import { Errors } from "@/lib/core/errors";
import { DayModel } from "@/server/models/day.model";
import type { Types } from "mongoose";
import type { ActivityInput } from "@/types/modules/activity.types";
import type { DayDoc } from "@/types/modules/day.types";

const addActivity = (
  userId: Types.ObjectId,
  dayId: Types.ObjectId,
  activity: ActivityInput,
) =>
  runService(async () => {
    const doc = await DayModel.findOneAndUpdate(
      { _id: dayId, userId },
      { $push: { activities: activity } },
      { new: true },
    );
    if (!doc) throw Errors.NOT_FOUND_ERROR("Day not found");

    const activities = doc.toObject<DayDoc>().activities;
    return activities[activities.length - 1];
  });

const updateActivity = (
  userId: Types.ObjectId,
  dayId: Types.ObjectId,
  activityId: Types.ObjectId,
  activity: Partial<ActivityInput>,
) =>
  runService(async () => {
    const doc = await DayModel.findOne({ _id: dayId, userId });
    if (!doc) throw Errors.NOT_FOUND_ERROR("Day not found");

    const activityDoc = doc.activities.find((a) => a._id.equals(activityId));
    if (!activityDoc) throw Errors.NOT_FOUND_ERROR("Activity not found");

    Object.assign(activityDoc, activity);
    await doc.save();
    return activityDoc;
  });

const reorderActivity = (
  userId: Types.ObjectId,
  dayId: Types.ObjectId,
  activityId: Types.ObjectId,
  newIndex: number,
) =>
  runService(async () => {
    const doc = await DayModel.findOne({ _id: dayId, userId });
    if (!doc) throw Errors.NOT_FOUND_ERROR("Day not found");

    const activityIndex = doc.activities.findIndex((a) =>
      a._id.equals(activityId),
    );
    if (activityIndex === -1)
      throw Errors.NOT_FOUND_ERROR("Activity not found");

    if (newIndex < 0 || newIndex >= doc.activities.length) {
      throw Errors.BAD_REQUEST_ERROR("newIndex out of bounds");
    }

    const [activity] = doc.activities.splice(activityIndex, 1);
    doc.activities.splice(newIndex, 0, activity);
    await doc.save();
  });

const deleteActivity = (
  userId: Types.ObjectId,
  dayId: Types.ObjectId,
  activityId: Types.ObjectId,
) =>
  runService(async () => {
    const doc = await DayModel.findOneAndUpdate(
      { _id: dayId, userId },
      { $pull: { activities: { _id: activityId } } },
    );

    if (!doc) throw Errors.NOT_FOUND_ERROR("Day not found");
  });

export const ActivityService = {
  add: addActivity,
  update: updateActivity,
  reorder: reorderActivity,
  delete: deleteActivity,
};
