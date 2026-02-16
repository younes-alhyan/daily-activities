import { Types } from "mongoose";
import { connectDB } from "@/lib/db/connect";
import { httpErrors } from "@/lib/http/httpErrors";
import { UserActivitiesModel } from "@/server/models/userActivities.model";
import type {
  ActivityInterface,
  ActivitiesDoc,
  UserActivitiesDoc,
} from "@/types/userActivities.types";

export async function getUserActivitiesService(
  userId: Types.ObjectId,
): Promise<ActivitiesDoc[]> {
  await connectDB();
  const doc = await UserActivitiesModel.findOne({ userId });
  if (!doc) throw httpErrors.NOT_FOUND_ERROR("User activities not found");

  return doc.toObject<UserActivitiesDoc>().userActivities;
}

export async function addActivitiesService(
  userId: Types.ObjectId,
  activities: ActivityInterface[],
): Promise<ActivitiesDoc[]> {
  await connectDB();
  const doc = await UserActivitiesModel.findOneAndUpdate(
    { userId },
    { $push: { userActivities: { activities } } },
    { new: true },
  );
  if (!doc) throw httpErrors.NOT_FOUND_ERROR("User activities not found");

  return doc.toObject<UserActivitiesDoc>().userActivities;
}

export async function deleteActivitiesService(
  userId: Types.ObjectId,
  activitiesId: Types.ObjectId,
) {
  await connectDB();
  const doc = await UserActivitiesModel.findOneAndUpdate(
    { userId },
    { $pull: { userActivities: { _id: activitiesId } } },
  );

  if (!doc) throw httpErrors.NOT_FOUND_ERROR("User activities not found");
}

export async function updateActivitiesService(
  userId: Types.ObjectId,
  activitiesId: Types.ObjectId,
  id: Types.ObjectId,
  description: string,
  state: boolean,
): Promise<ActivitiesDoc[]> {
  await connectDB();
  const doc = await UserActivitiesModel.findOneAndUpdate(
    {
      userId,
      "userActivities._id": activitiesId,
      "userActivities.activities._id": id,
    },
    {
      $set: {
        "userActivities.$[day].activities.$[act].description": description,
        "userActivities.$[day].activities.$[act].state": state,
      },
    },
    {
      new: true,
      arrayFilters: [{ "day._id": activitiesId }, { "act._id": id }],
    },
  );
  if (!doc) throw httpErrors.NOT_FOUND_ERROR("User activities not found");

  return doc.toObject<UserActivitiesDoc>().userActivities;
}
