import type { ActivityDoc, ActivityDTO } from "@/types/modules/activity.types";
import type { DayDoc, DayDTO } from "@/types/modules/day.types";
import type { UserDoc, UserDTO } from "@/types/modules/user.types";

export const cleanUser = (user: UserDoc): UserDTO => ({
  id: user._id.toString(),
  username: user.username,
});

export const cleanActivity = (activity: ActivityDoc): ActivityDTO => ({
  id: activity._id.toString(),
  type: activity.type,
  description: activity.description,
  state: activity.state,
});

export const cleanDay = (day: DayDoc): DayDTO => ({
  id: day._id.toString(),
  activities: day.activities.map(cleanActivity),
});
