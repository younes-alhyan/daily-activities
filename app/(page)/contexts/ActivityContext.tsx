"use client";
import { createContext, useContext } from "react";
import { activityHooks, activityRequests } from "@/features/activity";
import { useSession } from "@/client/contexts/SessionContext";
import type { ActivityDTO } from "@/modules/types/activity.types";

type ActivityContextType = {
  updateActivity: ReturnType<typeof activityHooks.update>;
  deleteActivity: ReturnType<typeof activityHooks.delete>;
  reorderActivity: ReturnType<typeof activityHooks.reorder>;
};

const ActivityContext = createContext<ActivityContextType | undefined>(
  undefined,
);

export function ActivityProvider({
  dayId,
  activityId,
  setActivities,
  children,
}: {
  dayId: string;
  activityId: string;
  setActivities: (updater: (prev: ActivityDTO[]) => ActivityDTO[]) => void;
  children: React.ReactNode;
}) {
  const { accessToken, requestWithRefresh } = useSession();
  const setActivity = (updater: (prev: ActivityDTO) => ActivityDTO) => {
    setActivities((prev) =>
      prev.map((v) => (v.id === activityId ? updater(v) : v)),
    );
  };

  const updateActivity = activityHooks.update({
    hookArgs: { accessToken, dayId, activityId },
    requestConstructor: activityRequests.update,
    requestHandler: requestWithRefresh,
    preCallBack: ({ body }) => setActivity((prev) => ({ ...prev, ...body })),
    postCallBack: ({ data }) => setActivity(() => data),
  });

  const deleteActivity = activityHooks.delete({
    hookArgs: { accessToken, dayId, activityId },
    requestConstructor: activityRequests.delete,
    requestHandler: requestWithRefresh,
    preCallBack: () =>
      setActivities((prev) => prev.filter((v) => v.id !== activityId)),
  });

  const reorderActivity = activityHooks.reorder({
    hookArgs: { accessToken, dayId, activityId },
    requestConstructor: activityRequests.reorder,
    requestHandler: requestWithRefresh,
  });

  return (
    <ActivityContext.Provider
      value={{ updateActivity, deleteActivity, reorderActivity }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const ctx = useContext(ActivityContext);
  if (!ctx) {
    throw new Error("useActivity must be used inside ActivityProvider");
  }
  return ctx;
}
