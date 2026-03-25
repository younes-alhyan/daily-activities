"use client";
import { Plus, Trash2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDay } from "@/app/(page)/contexts/DayContext";
import { useDays } from "@/app/(page)/contexts/DaysContext";
import { Button } from "@/client/components/ui/button";
import type { SetStateAction } from "react";

interface DayActionsProps {
  daysCount: number;
  setSelectedIndex: React.Dispatch<SetStateAction<number>>;
}

export function DayActions({ daysCount, setSelectedIndex }: DayActionsProps) {
  const router = useRouter();
  const { days, addDay } = useDays();
  const { deleteDay } = useDay();
  const defaultActivities = days[days.length - 1].activities.map((v) => ({
    type: v.type,
    state: false,
    description: "",
  }));

  const addDayHandler = async () => {
    setSelectedIndex(daysCount);
    await addDay.call({ body: defaultActivities });
  };

  const deleteDayHandler = () => {
    setSelectedIndex((prev) => Math.max(prev - 1, 0));
    deleteDay.call();
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="group"
        onClick={addDayHandler}
        disabled={addDay.isLoading}
      >
        <Plus className="text-muted-foreground group-hover:text-accent-blue" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="group"
        onClick={deleteDayHandler}
        disabled={deleteDay.isLoading}
      >
        <Trash2 className="text-muted-foreground group-hover:text-accent-red" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="group"
        onClick={() => router.push("/user")}
      >
        <User className="text-muted-foreground group-hover:text-accent-light-blue" />
      </Button>
    </div>
  );
}
