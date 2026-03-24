import { runService } from "@/lib/db";
import { DayModel } from "@/modules/models/day.model";
import type { Types } from "mongoose";
import type { ActivityInput } from "@/modules/types/activity.types";
import type { DayDoc } from "@/modules/types/day.types";

const getDays = (userId: Types.ObjectId) =>
  runService(async () => {
    const days = await DayModel.find({ userId });
    return days.map((d) => d.toObject<DayDoc>());
  });

const addDay = (userId: Types.ObjectId, activities: ActivityInput[]) =>
  runService(async () => {
    const doc = await DayModel.create({
      userId,
      activities,
    });
    return doc.toObject<DayDoc>();
  });

export const daysServices = {
  get: getDays,
  add: addDay,
};
