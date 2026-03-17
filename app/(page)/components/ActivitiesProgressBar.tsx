import { Progress } from "@/client/components/progress";
import type { ActivityDTO } from "@/types/day.types";

interface ActivitiesProgressBarProps {
  activities: ActivityDTO[];
}

export function ActivitiesProgressBar({ activities }: ActivitiesProgressBarProps) {
  const total = activities.length;
  const checked = activities.filter((v) => v.state).length;
  const value = total === 0 ? 0 : (checked / total) * 100;

  return (
    <div className="w-full flex flex-col my-4 px-2 gap-2">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Day Progress</span>
        <span>{total === 0 ? "N/A" : `${checked}/${total}`}</span>
      </div>

      <Progress value={value} />
    </div>
  );
}
