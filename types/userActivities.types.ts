import { Types } from "mongoose";

// Activity Type
export const activityTypes = [
  "watching",
  "gaming",
  "coding",
  "reading",
] as const;
export type ActivityType = (typeof activityTypes)[number];

// Activity Interface
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

// Activities Interface
export interface ActivitiesDoc {
  _id: Types.ObjectId;
  activities: ActivityDoc[];
}
export interface ActivitiesDTO {
  id: string;
  activities: ActivityDTO[];
}

// User Activities Interface
export interface UserActivitiesDoc {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  userActivities: ActivitiesDoc[];
}
export interface UserActivitiesDTO {
  id: string;
  userId: string;
  userActivities: ActivitiesDTO[];
}
