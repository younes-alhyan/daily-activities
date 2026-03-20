"use client";
import { useState } from "react";
import { Card, CardContent } from "@/client/components/ui/card";
import { Checkbox } from "@/client/components/ui/checkbox";
import { Textarea } from "@/client/components/ui/textarea";
import { ActivityActions } from "@/app/(page)/components/ActivityActions";
import { ActivityInfo } from "@/app/(page)/components/ActivityInfo";
import type { ApiHooksRoutes } from "@/types/core/api-hooks.types";
import type { ActivityDTO, ActivityInput } from "@/types/modules/activity.types";

interface ActivityCardProps {
  activity: ActivityDTO;
  updateActivity: ApiHooksRoutes["activities"]["activity"]["update"]["Hook"];
  deleteActivity: ApiHooksRoutes["activities"]["activity"]["delete"]["Hook"];
}

export function ActivityCard({
  activity,
  updateActivity,
  deleteActivity,
}: ActivityCardProps) {
  const [activityInput, setActivityInput] = useState<ActivityInput>(activity);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => setIsEditing((v) => !v);
  const updateInput = (patch: Partial<ActivityInput>) => {
    setActivityInput((v) => ({ ...v, ...patch }));
  };

  const updateActivityHandler = () => {
    updateActivity.call({ activityId: activity.id, body: activityInput });
  };
  const deleteActivityHandler = () => {
    deleteActivity.call({ activityId: activity.id });
  };

  return (
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
              updateType={(type) => updateInput({ type })}
            />
            <ActivityActions
              isEditing={isEditing}
              toggleEditing={toggleEditing}
              discardChanges={() => {
                console.log(activity);
                updateInput(activity);
              }}
              updateActivityHandler={updateActivityHandler}
              deleteActivcityHandler={deleteActivityHandler}
            />
          </div>
          {/* Checkbox */}
          <Checkbox
            checked={activityInput.state}
            onCheckedChange={() => {
              const newState = !activityInput.state;
              updateInput({ state: newState });
              updateActivity.call({
                activityId: activity.id,
                body: { ...activityInput, state: newState },
              });
            }}
          />
        </div>

        {/* Description */}
        {isEditing ? (
          <Textarea
            value={activityInput.description}
            onChange={(e) => updateInput({ description: e.target.value })}
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
  );
}
