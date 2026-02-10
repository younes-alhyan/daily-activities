import { Schema, model, models } from "mongoose";

const activitySchema = new Schema({
  type: {
    type: String,
    enum: ["watching", "gaming", "coding", "reading"],
    required: true,
  },
  description: { type: String, default: "" },
  state: { type: Boolean, default: false },
});

const daySchema = new Schema({
  activities: { type: [activitySchema], required: true },
});

export const DayModel = models.Day || model("Day", daySchema);
