import { Schema, model, models, Model, Types } from "mongoose";
import { activityTypes } from "@/types/day.types";
import type { ActivityDoc, DayDoc } from "@/types/day.types";

const activitySchema = new Schema<ActivityDoc>({
  type: {
    type: String,
    enum: activityTypes,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  state: {
    type: Boolean,
    default: false,
  },
});

const DaySchema = new Schema<DayDoc>({
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  activities: {
    type: [activitySchema],
    default: [],
  },
});

export const DayModel: Model<DayDoc> =
  (models.Day as Model<DayDoc>) || model<DayDoc>("Day", DaySchema);
