"use client";
import { Reorder } from "framer-motion";
import { useActivities } from "@/app/(page)/contexts/ActivitiesContext";
import { ActivityProvider } from "@/app/(page)/contexts/ActivityContext";
import { ActivityCard } from "@/app/(page)/components/ActivityCard";
import type { DayDTO } from "@/modules/types/day.types";

interface ActivitiesListProps {
  day: DayDTO;
}

export function ActivitiesList({ day }: ActivitiesListProps) {
  const { setActivities } = useActivities();
  const { activities } = day;

  return (
    <Reorder.Group
      axis="y"
      values={activities}
      onReorder={(newOrder) => setActivities(() => newOrder)}
      className="flex flex-col gap-2"
    >
      {activities.map((activity) => (
        <ActivityProvider
          key={activity.id}
          dayId={day.id}
          activityId={activity.id}
          setActivities={setActivities}
        >
          <ActivityCard
            activity={activity}
            findActivityIndex={(id) => activities.findIndex((v) => v.id === id)}
          />
        </ActivityProvider>
      ))}
    </Reorder.Group>
  );
}
