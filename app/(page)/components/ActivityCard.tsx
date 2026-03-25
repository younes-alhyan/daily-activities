"use client";
import { Reorder } from "framer-motion";
import { useState } from "react";
import { useActivity } from "@/app/(page)/contexts/ActivityContext";
import { ActivityActions } from "@/app/(page)/components/ActivityActions";
import { ActivityInfo } from "@/app/(page)/components/ActivityInfo";
import { Card, CardContent } from "@/client/components/ui/card";
import { Checkbox } from "@/client/components/ui/checkbox";
import { Textarea } from "@/client/components/ui/textarea";
import type {
  ActivityDTO,
  ActivityInput,
} from "@/modules/types/activity.types";

interface ActivityCardProps {
  activity: ActivityDTO;
  findActivityIndex: (activityId: string) => number;
}

export function ActivityCard({
  activity,
  findActivityIndex,
}: ActivityCardProps) {
  const [activityInput, setActivityInput] = useState<ActivityInput>(activity);
  const [isEditing, setIsEditing] = useState(false);
  const { updateActivity, deleteActivity, reorderActivity } = useActivity();

  const toggleEditing = () => setIsEditing((v) => !v);
  const onUpdateActivityInput = (patch: Partial<ActivityInput>) => {
    setActivityInput((v) => ({ ...v, ...patch }));
  };

  return (
    <Reorder.Item
      key={activity.id}
      value={activity}
      onDragEnd={() => {
        reorderActivity.call({
          body: { newIndex: findActivityIndex(activity.id) },
        });
      }}
    >
      <Card
        className={`transition-opacity ${activityInput.state ? "opacity-50" : "opacity-100"} rounded-md`}
      >
        <CardContent className="flex flex-col gap-3">
          {/* Top Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ActivityInfo
                isEditing={isEditing}
                activityType={activityInput.type}
                setActivityType={(type) => onUpdateActivityInput({ type })}
              />
              <ActivityActions
                isEditing={isEditing}
                toggleEditing={toggleEditing}
                discardChanges={() => onUpdateActivityInput(activity)}
                updateActivityHandler={() =>
                  updateActivity.call({ body: activityInput })
                }
                deleteActivcityHandler={deleteActivity.call}
              />
            </div>
            {/* Checkbox */}
            <Checkbox
              checked={activityInput.state}
              onCheckedChange={() => {
                const newState = !activityInput.state;
                onUpdateActivityInput({ state: newState });
                updateActivity.call({
                  body: { ...activityInput, state: newState },
                });
              }}
            />
          </div>

          {/* Description */}
          {isEditing ? (
            <Textarea
              value={activityInput.description}
              onChange={(e) =>
                onUpdateActivityInput({ description: e.target.value })
              }
              placeholder="Activity description"
              className="resize-none overflow-hidden min-h-10"
            />
          ) : (
            <p className="text-sm text-muted-foreground whitespace-pre-wrap min-h-10">
              {activityInput.description || "Add Description"}
            </p>
          )}
        </CardContent>
      </Card>
    </Reorder.Item>
  );
}
