import { runService } from "@/lib/db";
import { Errors } from "@/lib/utils/errors";
import { DayModel } from "@/modules/models/day.model";
import type { Types } from "mongoose";
import type { ActivityInput } from "@/modules/types/activity.types";

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

    const activities = doc.activities;
    return activities[activities.length - 1];
  });

export const activitiesServices = {
  add: addActivity,
};
