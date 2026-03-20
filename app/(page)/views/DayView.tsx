import { useDay } from "@/client/hooks/useDay";
import { ActivitiesList } from "@/app/(page)/components/ActivitiesList";
import { ActivitiesProgressBar } from "@/app/(page)/components/ActivitiesProgressBar";
import { DayActions } from "@/app/(page)/views/DayActions";
import { DaysNav } from "@/app/(page)/views/DaysNav";
import type { SetStateAction } from "react";
import type { DayDTO } from "@/types/modules/day.types";

interface DayViewProps {
  day: DayDTO;
  setDays: React.Dispatch<SetStateAction<DayDTO[] | undefined>>;
  daysCount: number;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<SetStateAction<number>>;
  onSelectNext: () => void;
  onSelectPrevious: () => void;
}

export function DayView({
  day,
  setDays,
  daysCount,
  selectedIndex,
  setSelectedIndex,
  onSelectNext,
  onSelectPrevious,
}: DayViewProps) {
  const { addDay, deleteDay, setActivities } = useDay({ day, setDays });

  const handleAddDay = async () => {
    setSelectedIndex(daysCount);
    await addDay.call();
  };

  const handleDeleteDay = () => {
    setSelectedIndex((prev) => Math.max(prev - 1, 0));
    deleteDay.call();
  };

  return (
    <>
      <div className="w-full flex justify-between items-center mb-6">
        <DaysNav
          daysCount={daysCount}
          selectedIndex={selectedIndex}
          onSelectNext={onSelectNext}
          onSelectPrevious={onSelectPrevious}
        />

        <DayActions
          addDay={handleAddDay}
          deleteDay={handleDeleteDay}
          isAdding={addDay.isLoading}
          isDeleting={deleteDay.isLoading}
        />
      </div>

      <ActivitiesProgressBar activities={day.activities} />
      <ActivitiesList day={day} setActivities={setActivities} />
    </>
  );
}
