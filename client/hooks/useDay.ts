"use client"
import { useAuth } from "@/client/contexts/AuthContext";
import { Requests } from "@/lib/core/requests";
import type { ActivityInput, DayDTO } from "@/types/day.types";

export const useDay = () => {
  const { token, requestWithRefresh } = useAuth();

  const getDays = async () => {
    const res = await requestWithRefresh<DayDTO[]>(Requests.day.get(token));
    return res.data;
  };

  const addDay = async (activities: ActivityInput[]) => {
    const res = await requestWithRefresh<DayDTO>(
      Requests.day.add(token, activities),
    );
    return res.data;
  };

  const deleteDay = async (dayId: string) => {
    await requestWithRefresh(Requests.day.delete(token, dayId));
  };

  return { getDays, addDay, deleteDay };
};
