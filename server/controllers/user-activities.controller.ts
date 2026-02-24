import { toObjectId } from "@/lib/utils/toObjectId";
import { cleanActivities } from "@/lib/utils/cleanObject";
import { UserActivitiesService } from "@/server/services/user-activities.service";
import type { ActivitiesDTO } from "@/types/user-activities.types";

const getUserActivities = async (userId: string): Promise<ActivitiesDTO[]> => {
  const activities = await UserActivitiesService.get(
    toObjectId(userId, "userId"),
  );
  return activities.userActivities.map(cleanActivities);
};

export const UserActivitiesController = {
  get: getUserActivities,
};
