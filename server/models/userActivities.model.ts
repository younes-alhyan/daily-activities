import { Schema, model, models, Model, Types } from "mongoose";
import { activityTypes } from "@/types/userActivities.types";
import type {
  ActivityDoc,
  ActivitiesDoc,
  UserActivitiesDoc,
} from "@/types/userActivities.types";

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

const activitiesSchema = new Schema<ActivitiesDoc>({
  activities: {
    type: [activitySchema],
    required: true,
  },
});

const userActivitiesSchema = new Schema<UserActivitiesDoc>({
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
    index: true,
  },
  userActivities: {
    type: [activitiesSchema],
    default: [],
  },
});

export const UserActivitiesModel: Model<UserActivitiesDoc> =
  (models.UserActivities as Model<UserActivitiesDoc>) ||
  model<UserActivitiesDoc>("UserActivities", userActivitiesSchema);
