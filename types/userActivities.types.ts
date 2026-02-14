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
export interface ActivityInterface {
  type: ActivityType;
  description: string;
  state: boolean;
}
export interface ActivityDoc extends ActivityInterface {
  _id: Types.ObjectId;
}
export interface Activity extends ActivityInterface {
  id: string;
}

// Activities Interface
export interface ActivitiesDoc {
  _id: Types.ObjectId;
  activities: ActivityDoc[];
}
export interface Activities {
  id: string;
  activities: Activity[];
}

// User Activities Interface
export interface UserActivitiesDoc {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  userActivities: ActivitiesDoc[];
}
export interface UserActivities {
  id: string;
  userId: string;
  userActivities: Activities[];
}
