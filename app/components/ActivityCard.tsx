"use client";
import { useState } from "react";
import { Film, Gamepad2, Code, BookOpen, Check } from "lucide-react";
import type { Activity, ActivityType } from "@/types/userActivities.types";

interface ActivityCardProps {
  activity: Activity;
  onActivityChange: (activityId: string, description: string, state: boolean) => void;
}

const activitiesMap: Record<
  ActivityType,
  { icon: any; color: string; duration: number }
> = {
  watching: { icon: Film, color: "text-accent-red", duration: 2 },
  gaming: { icon: Gamepad2, color: "text-accent-purple", duration: 3 },
  coding: { icon: Code, color: "text-accent-blue", duration: 1.5 },
  reading: { icon: BookOpen, color: "text-accent-yellow", duration: 1.5 },
};

export default function ActivityCard({
  activity,
  onActivityChange,
}: ActivityCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(activity.description);

  const handleStateChange = () => {
    onActivityChange(activity.id, activity.description, !activity.state);
  };

  const handleDescriptionChange = () => {
    setIsEditing(false);
    onActivityChange(activity.id, description, activity.state);
  };

  const activityInfo = activitiesMap[activity.type];
  return (
    <div
      className={`flex flex-col p-4 gap-2 bg-card rounded-md transition-all duration-200 ease-out border border-border hover:border-[rgba(255,255,255,0.08)] ${activity.state ? "opacity-50" : "opacity-100"}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <activityInfo.icon
            className={`w-5 h-5 shrink-0 ${activityInfo.color}`}
          />

          <span className="text-sm font-medium leading-none truncate">
            {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
          </span>

          <span className="text-sm text-text-secondary leading-none shrink-0">
            • {activityInfo.duration}h
          </span>
        </div>

        <button
          onClick={() => handleStateChange()}
          className={`h-6 w-6 grid place-items-center rounded-sm border-2 cursor-pointer
          transition-colors duration-200 ease-out
          ${activity.state ? "bg-accent-green border-accent-green" : "bg-card border-border"}
        `}
        >
          {activity.state && (
            <Check className="w-4 h-4 text-card transition-opacity duration-200 ease-out" />
          )}
        </button>
      </div>
      {isEditing ? (
        <textarea
          autoFocus
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={handleDescriptionChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.blur();
            }
            if (e.key === "Escape") {
              setIsEditing(false);
            }
          }}
          onInput={(e) => {
            const el = e.currentTarget;
            el.style.height = "auto";
            el.style.height = `${el.scrollHeight}px`;
          }}
          className="mt-2 w-full px-2 py-1.5 text-sm bg-card text-text-primary rounded-md border border-border shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] resize-none overflow-hidden outline-none transition-all duration-200 ease-out focus:border-transparent focus:ring-2 focus:ring-(--color-border) focus:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
        />
      ) : (
        <p
          className="text-sm text-text-secondary cursor-text whitespace-pre-wrap wrap-break-word"
          onClick={() => setIsEditing(true)}
        >
          {activity.description || "Add Description"}
        </p>
      )}
    </div>
  );
}
