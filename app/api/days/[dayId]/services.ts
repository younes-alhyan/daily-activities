import { runService } from "@/lib/db";
import { Errors } from "@/lib/utils/errors";
import { DayModel } from "@/modules/models/day.model";
import type { Types } from "mongoose";

const deleteDay = (userId: Types.ObjectId, dayId: Types.ObjectId) =>
  runService(async () => {
    const doc = await DayModel.findOneAndDelete({
      _id: dayId,
      userId,
    });
    if (!doc) throw Errors.NOT_FOUND_ERROR("Day not found");
  });

export const dayServices = {
  delete: deleteDay,
};
