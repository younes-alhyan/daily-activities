import type { UserDoc, UserDTO } from "@/types/user.types";
import type {
  ActivityDoc,
  ActivityDTO,
  DayDoc,
  DayDTO,
} from "@/types/day.types";

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
