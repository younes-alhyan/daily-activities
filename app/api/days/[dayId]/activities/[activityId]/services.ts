import { runService } from "@/lib/db";
import { Errors } from "@/lib/utils/errors";
import { DayModel } from "@/modules/models/day.model";
import type { Types } from "mongoose";
import type { ActivityInput } from "@/modules/types/activity.types";

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

export const activityServices = {
  update: updateActivity,
  delete: deleteActivity,
  reorder: reorderActivity,
};
