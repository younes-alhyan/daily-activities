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
export interface Activity extends ActivityInterface {
  id: string;
}
export interface ActivityDoc extends ActivityInterface {
  _id: Types.ObjectId;
}

// Activities Interface
export interface ActivitiesInterface {
  activities: Activity[];
}
export interface Activities extends ActivitiesInterface {
  id: string;
}
export interface ActivitiesDoc extends ActivitiesInterface {
  _id: Types.ObjectId;
}

// User Activities Interface
export interface UserActivitiesInterface {
  userActivities: Activities[];
}
export interface UserActivities extends UserActivitiesInterface {
  id: string;
  userId: string;
}
export interface UserActivitiesDoc extends UserActivitiesInterface {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
}
