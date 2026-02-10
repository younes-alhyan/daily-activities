import {
  getDays,
  addDay,
  deleteDay,
  updateDayActivity,
} from "../services/day.service";

const dayData = {
  activities: [
    { type: "watching", description: "", state: false },
    { type: "gaming", description: "", state: false },
    { type: "watching", description: "", state: false },
    { type: "coding", description: "", state: false },
    { type: "watching", description: "", state: false },
    { type: "reading", description: "", state: false },
    { type: "watching", description: "", state: false },
  ],
};

// Converts a mongoose doc (or plain object) to JSON-safe object,
// removes mongoose internals, maps _id -> id, also for activities.
function cleanDay(doc: any) {
  const obj =
    doc?.toObject?.({ versionKey: false, getters: false, virtuals: false }) ??
    doc;

  if (!obj) return obj;

  const { _id, activities, ...rest } = obj;

  return {
    id: String(_id),
    ...rest,
    activities: Array.isArray(activities)
      ? activities.map((a: any) => {
          const { _id: actId, ...aRest } = a;
          return { id: String(actId), ...aRest };
        })
      : [],
  };
}

export async function getDaysController() {
  const days = await getDays(); // mongoose docs
  return days.map(cleanDay);
}

export async function addDayController() {
  const created = await addDay(dayData); // mongoose doc
  return cleanDay(created);
}

export async function deleteDayController(id: string) {
  const result = await deleteDay(id); // deleteOne result
  const deleted = (result as any)?.deletedCount === 1;

  return { id, deleted };
}

export async function updateDayActivityController(
  id: string,
  activityId: string,
  description: string,
  state: boolean
) {
  const result = await updateDayActivity(id, activityId, description, state);
  const updated = (result as any)?.modifiedCount === 1;

  // Since your service uses updateOne (doesn't return the updated doc),
  // controller returns a clean summary.
  return {
    id,
    activityId,
    updated,
  };
}
