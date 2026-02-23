import type { UserDoc, UserDTO } from "@/types/user.types";
import type {
  ActivityDoc,
  ActivityDTO,
  ActivitiesDoc,
  ActivitiesDTO,
} from "@/types/user-activities.types";

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

export const cleanActivities = (activities: ActivitiesDoc): ActivitiesDTO => ({
  id: activities._id.toString(),
  activities: activities.activities.map(cleanActivity),
});
