import { Schema, model, models, Types, type Model } from "mongoose";
import {
  activityTypes,
  type ActivityDoc,
} from "@/types/modules/activity.types";
import type { DayDoc } from "@/types/modules/day.types";

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
