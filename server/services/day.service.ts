import { connectDB } from "@/lib/db/connect";
import { DayModel } from "@/server/models/Day";

export async function getDays() {
  await connectDB();
  return DayModel.find();
}

export async function addDay(dayData: any) {
  await connectDB();
  return DayModel.create(dayData);
}

export async function deleteDay(id: string) {
  await connectDB();
  return DayModel.deleteOne({ _id: id });
}

export async function updateDayActivity(
  id: string,
  activityId: string,
  description: string,
  state: boolean,
) {
  await connectDB();
  return DayModel.updateOne(
    {
      _id: id,
      "activities._id": activityId,
    },
    {
      $set: {
        "activities.$.description": description,
        "activities.$.state": state,
      },
    },
  );
}
