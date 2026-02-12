import { toObjectId } from "@/lib/utils/toObjectId";
import {
  getUserActivitiesService,
  addActivitiesService,
  deleteActivitiesService,
  updateUserActivityService,
} from "@/server/services/userActivities.service";
import type { ActivityInterface } from "@/types/userActivities.types";
import { BAD_REQUEST_ERROR, NOT_FOUND_ERROR } from "@/types/error.types";

const defaultActivities = [
  { type: "watching", description: "", state: false },
  { type: "gaming", description: "", state: false },
  { type: "watching", description: "", state: false },
  { type: "coding", description: "", state: false },
  { type: "watching", description: "", state: false },
  { type: "reading", description: "", state: false },
  { type: "watching", description: "", state: false },
] as const satisfies ActivityInterface[];

const cleanUserActivities = (doc: any) => {
  if (!doc) return null;

  const obj =
    doc?.toObject?.({ versionKey: false, getters: false, virtuals: false }) ??
    doc;

  return {
    id: String(obj._id),
    userId: String(obj.userId),
    userActivities: (obj.userActivities ?? []).map((day: any) => ({
      id: String(day._id),
      activities: (day.activities ?? []).map((a: any) => ({
        id: String(a._id),
        type: a.type,
        description: a.description,
        state: a.state,
      })),
    })),
  };
};

export async function getUserActivitiesController(userId: string) {
  const doc = await getUserActivitiesService(toObjectId(userId, "userId"));
  if (!doc) throw NOT_FOUND_ERROR("User activities not found");
  return cleanUserActivities(doc);
}

export async function addActivitiesController(userId: string) {
  const activities: ActivityInterface[] = defaultActivities.map((a) => ({
    ...a,
  }));

  const doc = await addActivitiesService(
    toObjectId(userId, "userId"),
    activities,
  );
  if (!doc) throw NOT_FOUND_ERROR("User activities not found");
  return cleanUserActivities(doc);
}

export async function deleteActivitiesController(
  userId: string,
  activitiesId: string,
) {
  const doc = await deleteActivitiesService(
    toObjectId(userId, "userId"),
    toObjectId(activitiesId, "activitiesId"),
  );

  if (!doc) throw NOT_FOUND_ERROR("User activities not found");
  return cleanUserActivities(doc);
}

export async function updateUserActivityController(
  userId: string,
  activitiesId: string,
  id: string,
  description: string,
  state: boolean,
) {
  if (typeof description !== "string") {
    throw BAD_REQUEST_ERROR("description must be a string");
  }
  if (typeof state !== "boolean") {
    throw BAD_REQUEST_ERROR("state must be a boolean");
  }

  const doc = await updateUserActivityService(
    toObjectId(userId, "userId"),
    toObjectId(activitiesId, "activitiesId"),
    toObjectId(id, "activityId"),
    description,
    state,
  );

  if (!doc) throw NOT_FOUND_ERROR("Activity not found");
  return cleanUserActivities(doc);
}
