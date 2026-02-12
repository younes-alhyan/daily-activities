"use client";
import { useState, useEffect } from "react";
import useApi from "./hooks/useApi";
import DaysNav from "./components/DaysNav";
import DayProgressBar from "./components/DayProgressBar";
import ActivityCard from "./components/ActivityCard";
import type { Day } from "@/types/types";
import LoadingPage from "./components/LoadingPage";

export default function Home() {
  const [days, setDays] = useState<Day[]>([]);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { getDays, addDay, deleteDay, updateActivity } = useApi();

  useEffect(() => {
    const fetchDays = async () => {
      try {
        setIsLoading(true);
        const fetchedDays = await getDays();
        setDays(fetchedDays);
        setCurrentDayIndex(fetchedDays.length > 0 ? fetchedDays.length - 1 : 0);
      } catch (error) {
        console.error("Failed to fetch days:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDays();
  }, []);

  const onAddDay = async () => {
    try {
      const newDay = await addDay();
      setDays((prev) => [...prev, newDay]);
      setCurrentDayIndex(days.length);
    } catch (error) {
      console.error("Failed to add day:", error);
    }
  };
  const onDeleteDay = async () => {
    try {
      await deleteDay(days[currentDayIndex].id);
      setDays((prev) =>
        prev.filter((day) => day.id !== days[currentDayIndex].id),
      );
      setCurrentDayIndex(Math.max(0, currentDayIndex - 1));
    } catch (error) {
      console.error("Failed to delete day:", error);
    }
  };
  const onActivityChange = async (
    id: string,
    description: string,
    state: boolean,
  ) => {
    try {
      await updateActivity(days[currentDayIndex].id, id, description, state);

      setDays((prevDays) =>
        prevDays.map((day, dIndex) =>
          dIndex !== currentDayIndex
            ? day
            : {
                ...day,
                activities: day.activities.map((activity) =>
                  activity.id !== id
                    ? activity
                    : { ...activity, description, state },
                ) as Day["activities"],
              },
        ),
      );
    } catch (error) {
      console.error("Failed to update activity:", error);
    }
  };

  const currentDayProgress =
    days[currentDayIndex]?.activities.filter((a) => a.state).length ?? 0;

  if (isLoading) return <LoadingPage />;
  if (days.length < 1) return null;
  
  return (
    <div className="min-h-screen w-full flex justify-center py-8 md:px-4">
      <div className="w-full max-w-4xl flex flex-col">
        <DaysNav
          currentDayIndex={currentDayIndex}
          setCurrentDayIndex={(index) => setCurrentDayIndex(index)}
          daysCount={days.length}
          onAddDay={onAddDay}
          onDeleteDay={onDeleteDay}
        />
        <DayProgressBar progress={currentDayProgress} />
        <div className="flex flex-col gap-4 mt-4">
          {days[currentDayIndex].activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onActivityChange={onActivityChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
