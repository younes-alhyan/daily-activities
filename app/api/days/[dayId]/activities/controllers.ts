import { cleanActivity } from "@/lib/utils/cleanObject";
import { Errors } from "@/lib/utils/errors";
import { toObjectId } from "@/lib/utils/toObjectId";
import { activitiesServices } from "@/app/api/days/[dayId]/activities/services";
import {
  activityTypes,
  type ActivityType,
  type ActivityDTO,
} from "@/modules/types/activity.types";

const isActivityType = (value: unknown): value is ActivityType => {
  return (
    typeof value === "string" && activityTypes.includes(value as ActivityType)
  );
};

const addActivity = async (
  userId: string,
  dayId: string,
  type: unknown,
  description: unknown,
  state: unknown,
): Promise<ActivityDTO> => {
  if (!isActivityType(type)) {
    throw Errors.BAD_REQUEST_ERROR("Invalid activity type");
  }

  const doc = await activitiesServices.add(
    toObjectId(userId, "userId"),
    toObjectId(dayId, "dayId"),
    {
      type,
      description: typeof description === "string" ? description : "",
      state: typeof state === "boolean" ? state : false,
    },
  );

  return cleanActivity(doc);
};

export const activitiesControllers = {
  add: addActivity,
};
