import { Types } from "mongoose";

// Activity Type
export const activityTypes = [
  "watching",
  "gaming",
  "coding",
  "reading",
] as const;
export type ActivityType = (typeof activityTypes)[number];

// Activity Interfaces
export interface ActivityInput {
  type: ActivityType;
  description: string;
  state: boolean;
}
export interface ActivityDoc extends ActivityInput {
  _id: Types.ObjectId;
}
export interface ActivityDTO extends ActivityInput {
  id: string;
}

// Day Interfaces
export interface DayDoc {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  activities: ActivityDoc[];
}
export interface DayDTO {
  id: string;
  activities: ActivityDTO[];
}
