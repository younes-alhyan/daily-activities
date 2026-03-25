"use client";
import { useState, useEffect } from "react";
import { DayProvider } from "@/app/(page)/contexts/DayContext";
import { useDays } from "@/app/(page)/contexts/DaysContext";
import { ActivitiesView } from "@/app/(page)/views/ActivitiesView";
import { DayActions } from "@/app/(page)/views/DayActions";
import { DayProgressBar } from "@/app/(page)/views/DayProgressBar";
import { DaysNav } from "@/app/(page)/views/DaysNav";
import { LoadingPage } from "@/client/components/LoadingPage";

export default function DaysPage() {
  const [initialized, setInitialized] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { days, setDays, getDays } = useDays();

  useEffect(() => {
    const fetchDays = async () => {
      const res = await getDays.call();
      if (!res) return;
      setSelectedIndex(res.data.length - 1);
      setInitialized(true);
    };

    fetchDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!initialized || getDays.isLoading) return <LoadingPage />;
  if (getDays.error) return <h1>Error getting days</h1>;
  if (days.length === 0) return <h1>No Days Yet</h1>;

  const day = days[selectedIndex];
  return (
    <DayProvider dayId={day.id} setDays={setDays}>
      <div className="min-h-screen w-full flex justify-center px-4 py-8">
        <div className="w-full max-w-4xl flex flex-col">
          <div className="w-full flex justify-between items-center mb-6">
            <DaysNav
              daysCount={days.length}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
            <DayActions
              daysCount={days.length}
              setSelectedIndex={setSelectedIndex}
            />
          </div>

          <DayProgressBar activities={day.activities} />
          <ActivitiesView day={day} />
        </div>
      </div>
    </DayProvider>
  );
}
