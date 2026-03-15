import { useAuth } from "@/client/contexts/AuthContext";
import { useApi } from "@/client/hooks/useApi";
import { Requests } from "@/lib/core/requests";
import type { ApiHooksRoutes } from "@/types/apiHooks.types";
import type { ActivityDTO } from "@/types/day.types";

export const useActivity = (
  dayId: string,
  setActivities: (
    updater: (activities: ActivityDTO[]) => ActivityDTO[],
  ) => void,
) => {
  const { accessToken, requestWithRefresh } = useAuth();

  const onAddActivity = (activity: ActivityDTO) => {
    setActivities((prev) => [...prev, activity]);
  };
  const onUpdateActivity = (activityId: string, activity: ActivityDTO) => {
    setActivities((prev) =>
      prev.map((v) => (v.id === activityId ? activity : v)),
    );
  };
  const onDeleteActivity = (activityId: string) => {
    setActivities((prev) => prev.filter((v) => v.id !== activityId));
  };

  const addActivity = useApi<
    ApiHooksRoutes["activities"]["add"]["Def"],
    { tempId: string }
  >({
    hookArgs: {
      accessToken,
      dayId,
      body: { type: "watching", state: false, description: "" },
    },
    request: Requests.activities.add,
    requestHandler: requestWithRefresh,
    preCallBack: (args) => {
      const tempId = crypto.randomUUID();
      onAddActivity({
        id: tempId,
        ...args.body,
      });
      return { tempId };
    },
    postCallBack: (data, args) => {
      onUpdateActivity(args.tempId, data);
    },
  });

  const updateActivity = useApi<
    ApiHooksRoutes["activities"]["activity"]["update"]["Def"]
  >({
    hookArgs: { accessToken, dayId },
    request: Requests.activities.activity.update,
    requestHandler: requestWithRefresh,
    preCallBack: (args) => {
      setActivities((prev) =>
        prev.map((v) =>
          v.id === args.activityId ? { ...v, ...args.body } : v,
        ),
      );
    },
  });

  const reorderActivity = useApi<
    ApiHooksRoutes["activities"]["activity"]["reorder"]["Def"]
  >({
    hookArgs: { accessToken, dayId },
    request: Requests.activities.activity.reorder,
    requestHandler: requestWithRefresh,
  });
  const deleteActivity = useApi<
    ApiHooksRoutes["activities"]["activity"]["delete"]["Def"]
  >({
    hookArgs: { accessToken, dayId },
    request: Requests.activities.activity.delete,
    requestHandler: requestWithRefresh,
    preCallBack: (args) => onDeleteActivity(args.activityId),
  });

  return {
    addActivity,
    updateActivity,
    reorderActivity,
    deleteActivity,
  };
};
