import { ChevronDown, Film, Gamepad2, Code, BookOpen } from "lucide-react";
import { Button } from "@/client/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/client/components/ui/dropdown-menu";
import {
  activityTypes,
  type ActivityType,
} from "@/modules/types/activity.types";

const activitiesInfoMap = {
  watching: { icon: Film, color: "text-accent-red", duration: 2 },
  gaming: { icon: Gamepad2, color: "text-accent-purple", duration: 3 },
  coding: { icon: Code, color: "text-accent-blue", duration: 1.5 },
  reading: { icon: BookOpen, color: "text-accent-yellow", duration: 1.5 },
};

interface ActivityInfoProps {
  isEditing: boolean;
  activityType: ActivityType;
  setActivityType: (activityType: ActivityType) => void;
}

export function ActivityInfo({
  isEditing,
  activityType,
  setActivityType,
}: ActivityInfoProps) {
  const {
    icon: ActivityIcon,
    color,
    duration,
  } = activitiesInfoMap[activityType];

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 min-w-0">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="bg-accent border-input text-foreground"
            asChild
          >
            <Button>
              <ActivityIcon className={color} /> {activityType} <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {activityTypes.map((a) => {
              if (a === activityType) return null;
              const { icon: Icon, color } = activitiesInfoMap[a];
              return (
                <DropdownMenuItem
                  key={a}
                  className="hover:bg-input/30 group"
                  onClick={() => setActivityType(a)}
                >
                  <Icon className={`${color} group-hover:${color}`} />
                  {a}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 min-w-0">
      <ActivityIcon className={color} />
      <span className="text-sm font-medium truncate">{activityType}</span>
      <span className="text-sm text-muted-foreground">• {duration}h</span>
    </div>
  );
}
