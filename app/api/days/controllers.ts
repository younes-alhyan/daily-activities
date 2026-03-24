import { cleanDay } from "@/lib/utils/cleanObject";
import { Errors } from "@/lib/utils/errors";
import { toObjectId } from "@/lib/utils/toObjectId";
import { daysServices } from "@/app/api/days/services";
import type { ActivityInput } from "@/modules/types/activity.types";
import type { DayDTO } from "@/modules/types/day.types";

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
  const doc = await daysServices.get(toObjectId(userId, "userId"));
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

  const doc = await daysServices.add(
    toObjectId(userId, "userId"),
    activitiesList,
  );
  return cleanDay(doc);
};

export const daysControllers = {
  get: getDays,
  add: addDay,
};
