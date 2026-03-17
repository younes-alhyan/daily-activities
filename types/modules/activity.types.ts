import type { Types } from "mongoose";

export const activityTypes = [
  "watching",
  "gaming",
  "coding",
  "reading",
] as const;
export type ActivityType = (typeof activityTypes)[number];

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