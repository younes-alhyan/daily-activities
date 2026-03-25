import { ActivitiesProvider } from "@/app/(page)/contexts/ActivitiesContext";
import { useDay } from "@/app/(page)/contexts/DayContext";
import { ActivitiesList } from "@/app/(page)/components/ActivitiesList";
import { AddActivityButton } from "@/app/(page)/components/AddActivityButton";
import type { DayDTO } from "@/modules/types/day.types";

interface ActivitiesViewProps {
  day: DayDTO;
}

export function ActivitiesView({ day }: ActivitiesViewProps) {
  const { setDay } = useDay();
  return (
    <ActivitiesProvider dayId={day.id} setDay={setDay}>
      <div className="flex flex-col gap-4 mt-4">
        <ActivitiesList day={day} />
        <AddActivityButton />
      </div>
    </ActivitiesProvider>
  );
}
