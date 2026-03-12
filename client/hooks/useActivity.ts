"use client"
import { useAuth } from "@/client/contexts/AuthContext";
import { Requests } from "@/lib/core/requests";
import type { ActivityInput, ActivityDTO } from "@/types/day.types";

export const useActivity = () => {
  const { token, requestWithRefresh } = useAuth();

  const addActivity = async (dayId: string, activity: ActivityInput) => {
    const res = await requestWithRefresh<ActivityDTO>(
      Requests.activity.add(token, dayId, activity),
    );
    return res.data;
  };

  const updateActivity = async (
    dayId: string,
    activityId: string,
    activity: Partial<ActivityInput>,
  ) => {
    const res = await requestWithRefresh<ActivityDTO>(
      Requests.activity.update(token, dayId, activityId, activity),
    );
    return res.data;
  };

  const reorderActivity = async (
    dayId: string,
    activityId: string,
    newIndex: number,
  ) => {
    await requestWithRefresh(
      Requests.activity.reorder(token, dayId, activityId, { newIndex }),
    );
  };

  const deleteActivity = async (dayId: string, activityId: string) => {
    await requestWithRefresh(
      Requests.activity.delete(token, dayId, activityId),
    );
  };

  return { addActivity, updateActivity, reorderActivity, deleteActivity };
};
