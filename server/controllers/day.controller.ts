import { Errors } from "@/lib/core/errors";
import { cleanDay } from "@/lib/utils/cleanObject";
import { toObjectId } from "@/lib/utils/toObjectId";
import { DayService } from "@/server/services/day.service";
import type { ActivityInput } from "@/types/modules/activity.types";
import type { DayDTO } from "@/types/modules/day.types";

const isActivityInput = (obj: unknown): obj is ActivityInput => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "type" in obj &&
    "description" in obj &&
    "state" in obj &&
    typeof obj.type === "string" &&
    (obj.description === undefined || typeof obj.description === "string") &&
    (obj.state === undefined || typeof obj.state === "boolean")
  );
};

const getDays = async (userId: string): Promise<DayDTO[]> => {
  const doc = await DayService.get(toObjectId(userId, "userId"));
  return doc.map(cleanDay);
};

const addDay = async (userId: string, activities: unknown): Promise<DayDTO> => {
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

  const doc = await DayService.add(
    toObjectId(userId, "userId"),
    activitiesList,
  );
  return cleanDay(doc);
};

const deleteDay = (userId: string, dayId: string): Promise<void> =>
  DayService.delete(toObjectId(userId, "userId"), toObjectId(dayId, "dayId"));

export const DayController = {
  get: getDays,
  add: addDay,
  delete: deleteDay,
};
