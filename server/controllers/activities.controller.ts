import { Errors } from "@/lib/core/errors";
import { toObjectId } from "@/lib/utils/toObjectId";
import { cleanActivities } from "@/lib/utils/cleanObject";
import { ActivitiesService } from "@/server/services/activities.service";
import type {
  ActivityInput,
  ActivitiesDTO,
} from "@/types/user-activities.types";

const isActivityInput = (obj: any): obj is ActivityInput => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.type === "string" &&
    (obj.description === undefined || typeof obj.description === "string") &&
    (obj.state === undefined || typeof obj.state === "boolean")
  );
};

const addActivities = async (
  userId: string,
  activities: unknown,
): Promise<ActivitiesDTO> => {
  let activitiesList: ActivityInput[] = [];

  if (activities == null) {
    activitiesList = [];
  } else if (!Array.isArray(activities)) {
    throw Errors.BAD_REQUEST_ERROR("Activities must be an array");
  } else if (!activities.every(isActivityInput)) {
    throw Errors.BAD_REQUEST_ERROR("Invalid activities format");
  } else {
    activitiesList = activities;
  }

  const doc = await ActivitiesService.add(
    toObjectId(userId, "userId"),
    activitiesList,
  );
  return cleanActivities(doc);
};

const deleteActivities = (
  userId: string,
  activitiesId: string,
): Promise<void> =>
  ActivitiesService.delete(
    toObjectId(userId, "userId"),
    toObjectId(activitiesId, "activitiesId"),
  );

export const ActivitiesController = {
  add: addActivities,
  delete: deleteActivities,
};
