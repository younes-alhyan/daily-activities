"use client";
import { Reorder } from "framer-motion";
import { Plus } from "lucide-react";
import { useActivity } from "@/client/hooks/useActivity";
import { Button } from "@/client/components/ui/button";
import { ActivityCard } from "@/app/(page)/components/ActivityCard";
import type { ActivityDTO } from "@/types/modules/activity.types";
import type { DayDTO } from "@/types/modules/day.types";

interface ActivitiesListProps {
  day: DayDTO;
  setActivities: (
    updater: (activities: ActivityDTO[]) => ActivityDTO[],
  ) => void;
}

export function ActivitiesList({ day, setActivities }: ActivitiesListProps) {
  const { addActivity, updateActivity, reorderActivity, deleteActivity } =
    useActivity(day.id, setActivities);

  const { activities } = day;

  const onDragEnd = (activityId: string) => {
    const newIndex = activities.findIndex((a) => a.id === activityId);
    reorderActivity.call({ activityId, body: { newIndex } });
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <Reorder.Group
        axis="y"
        values={activities}
        onReorder={(newOrder) => setActivities(() => newOrder)}
        className="flex flex-col gap-2"
      >
        {activities.map((activity) => (
          <Reorder.Item
            key={activity.id}
            value={activity}
            onDragEnd={() => onDragEnd(activity.id)}
          >
            <ActivityCard
              activity={activity}
              updateActivity={updateActivity}
              deleteActivity={deleteActivity}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <Button
        variant="outline"
        className="w-full py-4"
        onClick={() => addActivity.call()}
        disabled={addActivity.isLoading}
      >
        <Plus />
        Add Activity
      </Button>
    </div>
  );
}
