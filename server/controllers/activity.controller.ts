import { Errors } from "@/lib/core/errors";
import { toObjectId } from "@/lib/utils/toObjectId";
import { cleanActivity } from "@/lib/utils/cleanObject";
import { ActivityService } from "@/server/services/activity.service";
import {
  activityTypes,
  type ActivityType,
  type ActivityDTO,
  ActivityInput,
} from "@/types/user-activities.types";

const isActivityType = (value: unknown): value is ActivityType => {
  return (
    typeof value === "string" && activityTypes.includes(value as ActivityType)
  );
};

const addActivity = async (
  userId: string,
  activitiesId: string,
  type: unknown,
  description: unknown,
  state: unknown,
): Promise<ActivityDTO> => {
  if (!isActivityType(type)) {
    throw Errors.BAD_REQUEST_ERROR("Invalid activity type");
  }

  const doc = await ActivityService.add(
    toObjectId(userId, "userId"),
    toObjectId(activitiesId, "activitiesId"),
    {
      type,
      description: typeof description === "string" ? description : "",
      state: typeof state === "boolean" ? state : false,
    },
  );

  return cleanActivity(doc);
};

const updateActivity = async (
  userId: string,
  activitiesId: string,
  activityId: string,
  type: unknown,
  description: unknown,
  state: unknown,
): Promise<ActivityDTO> => {
  const updateData: Partial<ActivityInput> = {};

  if (type !== undefined) {
    if (!isActivityType(type)) {
      throw Errors.BAD_REQUEST_ERROR("Invalid activity type");
    }
    updateData.type = type;
  }

  if (description !== undefined) {
    if (typeof description !== "string") {
      throw Errors.BAD_REQUEST_ERROR("Description must be a string");
    }
    updateData.description = description;
  }

  if (state !== undefined) {
    if (typeof state !== "boolean") {
      throw Errors.BAD_REQUEST_ERROR("State must be a boolean");
    }
    updateData.state = state;
  }

  if (Object.keys(updateData).length === 0) {
    throw Errors.BAD_REQUEST_ERROR("At least one field must be provided");
  }

  const doc = await ActivityService.update(
    toObjectId(userId, "userId"),
    toObjectId(activitiesId, "activitiesId"),
    toObjectId(activityId, "activityId"),
    updateData,
  );

  return cleanActivity(doc);
};

const reorderActivity = async (
  userId: string,
  activitiesId: string,
  activityId: string,
  newIndex: unknown,
): Promise<void> => {
  if (typeof newIndex !== "number" || !Number.isInteger(newIndex)) {
    throw Errors.BAD_REQUEST_ERROR("newIndex must be an integer");
  }

  return ActivityService.reorder(
    toObjectId(userId, "userId"),
    toObjectId(activitiesId, "activitiesId"),
    toObjectId(activityId, "activityId"),
    newIndex,
  );
};

const deleteActivity = (
  userId: string,
  activitiesId: string,
  activityId: string,
): Promise<void> =>
  ActivityService.delete(
    toObjectId(userId, "userId"),
    toObjectId(activitiesId, "activitiesId"),
    toObjectId(activityId, "activityId"),
  );

export const ActivityController = {
  add: addActivity,
  update: updateActivity,
  reorder: reorderActivity,
  delete: deleteActivity,
};
