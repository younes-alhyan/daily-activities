import { cleanActivity } from "@/lib/utils/cleanObject";
import { Errors } from "@/lib/utils/errors";
import { toObjectId } from "@/lib/utils/toObjectId";
import { activityServices } from "@/app/api/days/[dayId]/activities/[activityId]/services";
import {
  activityTypes,
  type ActivityType,
  type ActivityInput,
  type ActivityDTO,
} from "@/modules/types/activity.types";

const isActivityType = (value: unknown): value is ActivityType => {
  return (
    typeof value === "string" && activityTypes.includes(value as ActivityType)
  );
};

const updateActivity = async (
  userId: string,
  dayId: string,
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

  const doc = await activityServices.update(
    toObjectId(userId, "userId"),
    toObjectId(dayId, "dayId"),
    toObjectId(activityId, "activityId"),
    updateData,
  );

  return cleanActivity(doc);
};

const deleteActivity = (
  userId: string,
  dayId: string,
  activityId: string,
): Promise<void> =>
  activityServices.delete(
    toObjectId(userId, "userId"),
    toObjectId(dayId, "dayId"),
    toObjectId(activityId, "activityId"),
  );

const reorderActivity = async (
  userId: string,
  dayId: string,
  activityId: string,
  newIndex: unknown,
): Promise<void> => {
  if (typeof newIndex !== "number" || !Number.isInteger(newIndex)) {
    throw Errors.BAD_REQUEST_ERROR("newIndex must be an integer");
  }

  return activityServices.reorder(
    toObjectId(userId, "userId"),
    toObjectId(dayId, "dayId"),
    toObjectId(activityId, "activityId"),
    newIndex,
  );
};

export const activityControllers = {
  update: updateActivity,
  delete: deleteActivity,
  reorder: reorderActivity,
};
