"use client";
import { useState, useEffect } from "react";
import { useDay } from "@/client/hooks/useDay";
import { DaysNavView } from "@/client/views/DaysNavView";
import { DayProgressBarView } from "@/client/views/DayProgressBarView";
import { DayView } from "@/client/views/DayView";
import { NoDaysView } from "@/client/views/NoDaysView";
import { LoadingPageComponent } from "@/client/components/LoadingComponent";
import type { ActivityDTO, DayDTO } from "@/types/day.types";

export default function DayPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [days, setDays] = useState<DayDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getDays } = useDay();

  useEffect(() => {
    getDays().then((days) => {
      setDays(days);
      setSelectedIndex(days.length > 0 ? days.length - 1 : 0);
      setIsLoading(false);
    });
  }, []);

  const onSelectNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % days.length);
  };
  const onSelectPrevious = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? days.length - 1 : prevIndex - 1,
    );
  };

  const onAddDay = (day: DayDTO) => {
    setDays((prev) => {
      const updated = [...prev, day];
      setSelectedIndex(updated.length - 1);
      return updated;
    });
  };
  const onUpdateDay = (activities: ActivityDTO[]) => {
    setDays((prev) =>
      prev.map((v, i) => (i === selectedIndex ? { ...v, activities } : v)),
    );
  };
  const onDeleteDay = () => {
    setDays((prev) => {
      const updated = prev.filter((_, i) => i !== selectedIndex);

      setSelectedIndex((current) => {
        if (updated.length === 0) return 0;
        if (current >= updated.length) return updated.length - 1;
        return current;
      });

      return updated;
    });
  };

  if (isLoading) return <LoadingPageComponent />;
  if (days.length === 0) return <NoDaysView onAddDay={onAddDay} />;

  const day = days[selectedIndex] ?? days[days.length - 1];
  return (
    <div className="min-h-screen w-full flex justify-center py-8 md:px-4">
      <div className="w-full max-w-4xl flex flex-col">
        <DaysNavView
          selectedIndex={selectedIndex}
          onSelectNext={onSelectNext}
          onSelectPrevious={onSelectPrevious}
          days={days}
          onAddDay={onAddDay}
          onDeleteDay={onDeleteDay}
        />
        <DayProgressBarView activities={day.activities} />
        <DayView
          dayId={day.id}
          activities={day.activities}
          onUpdateDay={onUpdateDay}
        />
      </div>
    </div>
  );
}
