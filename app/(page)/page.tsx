"use client";
import { useState, useEffect } from "react";
import { useDays } from "@/client/hooks/useDays";
import { DayView } from "./views/DayView";
import { LoadingPage } from "@/app/LoadingPage";

export default function DayPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { days, getDays, setDays } = useDays();

  useEffect(() => {
    const fetchDays = async () => {
      const res = await getDays.call();
      if (!res) return;
      setSelectedIndex(res.data.length - 1);
    };

    fetchDays();
  }, []);

  if (getDays.isLoading || !days) return <LoadingPage />; 
  if (getDays.error) return <h1>Error getting days</h1>;
  if (days.length === 0) return <h1>No Days Yet</h1>;
  
  const day = days[selectedIndex];
    
  const onSelectNext = () => {
    setSelectedIndex((prev) => Math.min(prev + 1, days.length - 1));
  };

  const onSelectPrevious = () => {
    setSelectedIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-4xl flex flex-col">
        <DayView
          day={day}
          setDays={setDays}
          daysCount={days.length}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          onSelectNext={onSelectNext}
          onSelectPrevious={onSelectPrevious}
        />
      </div>
    </div>
  );
}
