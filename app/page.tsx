"use client";
import { useState, useEffect } from "react";
import useApi from "@/app/hooks/useApi";
import UserActivitiesNav from "@/app/components/UserActivitiesNav";
import ActivitiesProgressBar from "@/app/components/ActivitiesProgressBar";
import ActivityCard from "@/app/components/ActivityCard";
import LoadingPage from "@/app/components/LoadingPage";
import type { Activities } from "@/types/userActivities.types";

export default function HomePage() {
  const [userActivities, setUserActivities] = useState<Activities[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const {
    getUserActivities,
    addActivities,
    deleteActivities,
    updateActivities,
  } = useApi();

  useEffect(() => {
    const fetchUserActivities = async () => {
      setIsLoading(true);
      const { userActivities } = await getUserActivities();
      setUserActivities(userActivities);
      setSelectedIndex(
        userActivities.length > 0 ? userActivities.length - 1 : 0,
      );
      setIsLoading(false);
    };
    fetchUserActivities();
  }, []);

  const onAddActivities = async () => {
    const { userActivities: next } = await addActivities();
    setUserActivities(next);
    setSelectedIndex(next.length - 1);
  };

  const onDeleteActivities = async () => {
    await deleteActivities(userActivities[selectedIndex].id);
    setUserActivities((prev) =>
      prev.filter(
        (activity) => activity.id !== userActivities[selectedIndex].id,
      ),
    );
    setSelectedIndex(Math.max(0, selectedIndex - 1));
  };

  const onActivityChange = async (
    activityId: string,
    description: string,
    state: boolean,
  ) => {
    const { userActivities: next } = await updateActivities(
      userActivities[selectedIndex].id,
      activityId,
      description,
      state,
    );

    setUserActivities(next);
  };

  if (isLoading) return <LoadingPage />;
  if (userActivities.length < 1) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">No days yet</h2>
          <p className="text-gray-500 mt-2">
            Start tracking your activities by creating your first day.
          </p>
        </div>

        <button
          onClick={onAddActivities}
          className="bg-gray-800 hover:bg-gray-700 transition-colors text-white font-medium py-2 px-6 rounded-lg shadow-sm"
        >
          + Add New Day
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center py-8 md:px-4">
      <div className="w-full max-w-4xl flex flex-col">
        <UserActivitiesNav
          selectedIndex={selectedIndex}
          setSelectedIndex={(index: number) => setSelectedIndex(index)}
          userActivitiesCount={userActivities.length}
          onAddActivities={onAddActivities}
          onDeleteActivities={onDeleteActivities}
        />
        <ActivitiesProgressBar
          progress={
            userActivities[selectedIndex].activities.filter((a) => a.state)
              .length ?? 0
          }
        />
        <div className="flex flex-col gap-4 mt-4">
          {userActivities[selectedIndex].activities.map((activity) => (
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
