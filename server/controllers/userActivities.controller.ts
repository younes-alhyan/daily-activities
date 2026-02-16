import { toObjectId } from "@/lib/utils/toObjectId";
import { httpErrors } from "@/lib/http/httpErrors";
import {
  getUserActivitiesService,
  addActivitiesService,
  deleteActivitiesService,
  updateActivitiesService,
} from "@/server/services/userActivities.service";
import type { UserActivitiesResponse } from "@/types/api.types";
import type {
  ActivityInterface,
  ActivitiesDoc,
  Activities,
} from "@/types/userActivities.types";

const defaultActivities = [
  { type: "watching", description: "", state: false },
  { type: "gaming", description: "", state: false },
  { type: "watching", description: "", state: false },
  { type: "coding", description: "", state: false },
  { type: "watching", description: "", state: false },
  { type: "reading", description: "", state: false },
  { type: "watching", description: "", state: false },
] as const satisfies ActivityInterface[];

const cleanUserActivities = (docs: ActivitiesDoc[]): Activities[] => {
  return docs.map((day) => {
    const { _id, ...restDay } = day;

    return {
      id: _id.toString(),
      ...restDay,
      activities: day.activities.map((activity) => {
        const { _id, ...restAct } = activity;
        return { id: _id.toString(), ...restAct };
      }),
    };
  });
};

export async function getUserActivitiesController(
  userId: string,
): Promise<UserActivitiesResponse> {
  if (!userId) {
    throw httpErrors.BAD_REQUEST_ERROR("userId is required");
  }

  const doc = await getUserActivitiesService(toObjectId(userId, "userId"));
  return { userActivities: cleanUserActivities(doc) };
}

export async function addActivitiesController(
  userId: string,
): Promise<UserActivitiesResponse> {
  if (!userId) {
    throw httpErrors.BAD_REQUEST_ERROR("userId is required");
  }

  const doc = await addActivitiesService(
    toObjectId(userId, "userId"),
    defaultActivities,
  );

  return { userActivities: cleanUserActivities(doc) };
}

export async function deleteActivitiesController(
  userId: string,
  activitiesId: string,
): Promise<void> {
  if (!userId) {
    throw httpErrors.BAD_REQUEST_ERROR("userId is required");
  }

  await deleteActivitiesService(
    toObjectId(userId, "userId"),
    toObjectId(activitiesId, "activitiesId"),
  );
}

export async function updateActivitiesController(
  userId: string,
  activitiesId: string,
  id: string,
  description: string,
  state: boolean,
): Promise<UserActivitiesResponse> {
  if (
    !userId ||
    !activitiesId ||
    !id ||
    typeof description !== "string" ||
    typeof state !== "boolean"
  ) {
    throw httpErrors.BAD_REQUEST_ERROR("All fields are required");
  }

  const doc = await updateActivitiesService(
    toObjectId(userId, "userId"),
    toObjectId(activitiesId, "activitiesId"),
    toObjectId(id, "activityId"),
    description,
    state,
  );

  return { userActivities: cleanUserActivities(doc) };
}
