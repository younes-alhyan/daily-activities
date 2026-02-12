import { Types } from "mongoose";
import { connectDB } from "@/lib/db/connect";
import { UserActivitiesModel } from "@/server/models/userActivities.model";
import type { ActivityInterface } from "@/types/userActivities.types";
import { INTERNAL_SERVER_ERROR } from "@/types/error.types";

export async function getUserActivitiesService(userId: Types.ObjectId) {
  await connectDB();
  try {
    return UserActivitiesModel.findOne({ userId });
  } catch (error) {
    console.error(error);
    throw INTERNAL_SERVER_ERROR();
  }
}

export async function addActivitiesService(
  userId: Types.ObjectId,
  activities: ActivityInterface[],
) {
  await connectDB();
  try {
    return UserActivitiesModel.findOneAndUpdate(
      { userId },
      { $push: { userActivities: { activities } } },
      { new: true },
    );
  } catch (error) {
    console.error(error);
    throw INTERNAL_SERVER_ERROR();
  }
}

export async function deleteActivitiesService(
  userId: Types.ObjectId,
  activitiesId: Types.ObjectId,
) {
  await connectDB();
  try {
    return UserActivitiesModel.findOneAndUpdate(
      { userId },
      { $pull: { userActivities: { _id: activitiesId } } },
      { new: true },
    );
  } catch (error) {
    console.error(error);
    throw INTERNAL_SERVER_ERROR();
  }
}

export async function updateUserActivityService(
  userId: Types.ObjectId,
  activitiesId: Types.ObjectId,
  id: Types.ObjectId,
  description: string,
  state: boolean,
) {
  await connectDB();
  try {
    return UserActivitiesModel.findOneAndUpdate(
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
  } catch (error) {
    console.error(error);
    throw INTERNAL_SERVER_ERROR();
  }
}
