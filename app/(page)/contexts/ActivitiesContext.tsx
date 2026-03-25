"use client";
import { createContext, useContext } from "react";
import { activitiesHooks, activitiesRequests } from "@/features/activities";
import { useSession } from "@/client/contexts/SessionContext";
import type { ActivityDTO } from "@/modules/types/activity.types";
import type { DayDTO } from "@/modules/types/day.types";

type ActivitiesContextType = {
  setActivities: (updater: (prev: ActivityDTO[]) => ActivityDTO[]) => void;
  addActivity: ReturnType<typeof activitiesHooks.add>;
};

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(
  undefined,
);

export function ActivitiesProvider({
  dayId,
  setDay,
  children,
}: {
  dayId: string;
  setDay: (updater: (prev: DayDTO) => DayDTO) => void;
  children: React.ReactNode;
}) {
  const { accessToken, requestWithRefresh } = useSession();
  const setActivities = (updater: (prev: ActivityDTO[]) => ActivityDTO[]) => {
    setDay((prev) => ({ ...prev, activities: updater(prev.activities) }));
  };

  const addActivity = activitiesHooks.add({
    hookArgs: { accessToken, dayId },
    requestConstructor: activitiesRequests.add,
    requestHandler: requestWithRefresh,
    preCallBack: ({ body }) => {
      const tempId = crypto.randomUUID();
      setActivities((prev) => [...prev, { id: tempId, ...body }]);
      return { tempId };
    },
    postCallBack: ({ args, data }) => {
      setActivities((prev) =>
        prev.map((v) => (v.id === args.tempId ? data : v)),
      );
    },
  });

  return (
    <ActivitiesContext.Provider value={{ setActivities, addActivity }}>
      {children}
    </ActivitiesContext.Provider>
  );
}

export function useActivities() {
  const ctx = useContext(ActivitiesContext);
  if (!ctx) {
    throw new Error("useActivities must be used inside ActivitiesProvider");
  }
  return ctx;
}
