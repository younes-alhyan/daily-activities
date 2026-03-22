import type { ActivityDoc, ActivityDTO } from "@/modules/types/activity.types";
import type { DayDoc, DayDTO } from "@/modules/types/day.types";
import type { UserDoc, UserDTO } from "@/modules/types/user.types";

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
