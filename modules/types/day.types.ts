import type { Types } from "mongoose";
import type { ActivityDoc, ActivityDTO } from "@/modules/types/activity.types";

export interface DayDoc {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  activities: ActivityDoc[];
}
export interface DayDTO {
  id: string;
  activities: ActivityDTO[];
}
