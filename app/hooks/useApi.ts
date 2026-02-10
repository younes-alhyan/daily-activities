"use client";
import { useAuth } from "./useAuth";
import type { Day, Activity } from "@/types/types";
export default function useApi() {
  const { token } = useAuth();  
  async function getDays(): Promise<Day[]> {
    const res = await fetch("/api/days", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch days");
    return res.json() || [];
  }
  async function addDay(): Promise<Day> {
    const res = await fetch("/api/days", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to add day");
    return res.json();
  }
  async function deleteDay(id: string): Promise<boolean> {
    const res = await fetch(`/api/days?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to delete day");
    return true;
  }
  async function updateActivity(
    dayId: string,
    activityId: string,
    description: string,
    state: boolean,
  ): Promise<Activity> {
    {
      const res = await fetch("/api/days", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: dayId,
          activityId,
          description,
          state,
        }),
      });
      if (!res.ok) throw new Error("Failed to update activity");
      return res.json();
    }
  }
  return { getDays, addDay, deleteDay, updateActivity };
}
