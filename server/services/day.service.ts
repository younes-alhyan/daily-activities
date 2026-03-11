import { Types } from "mongoose";
import { runService } from "@/lib/db";
import { Errors } from "@/lib/core/errors";
import { DayModel } from "@/server/models/day.model";
import type { ActivityInput, DayDoc } from "@/types/day.types";

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

const deleteDay = (userId: Types.ObjectId, dayId: Types.ObjectId) =>
  runService(async () => {
    const doc = await DayModel.findOneAndDelete({
      _id: dayId,
      userId,
    });
    if (!doc) throw Errors.NOT_FOUND_ERROR("Day not found");
  });

export const DayService = {
  get: getDays,
  add: addDay,
  delete: deleteDay,
};
