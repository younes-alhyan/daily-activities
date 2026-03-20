"use client";
import { Requests } from "@/lib/core/requests";
import { useAuth } from "@/client/contexts/AuthContext";
import { useApi } from "@/client/hooks/useApi";
import type { SetStateAction } from "react";
import type { ApiHooksRoutes } from "@/types/core/api-hooks.types";
import type { ActivityDTO } from "@/types/modules/activity.types";
import type { DayDTO } from "@/types/modules/day.types";

interface UseDayProps {
  day: DayDTO;
  setDays: React.Dispatch<SetStateAction<DayDTO[] | undefined>>;
}

export const useDay = ({ day, setDays }: UseDayProps) => {
  const { accessToken, requestWithRefresh } = useAuth();
  const { id: dayId, activities } = day;

  const onAddDay = (day: DayDTO) => {
    setDays((prev) => [...(prev ?? []), day]);
  };
  const onUpdateDay = (dayId: string, day: DayDTO) => {
    setDays((prev) => prev?.map((v) => (v.id === dayId ? day : v)));
  };
  const onDeleteDay = () => {
    setDays((prev) => prev?.filter((v) => v.id !== dayId));
  };

  const setActivities = (
    updater: (activities: ActivityDTO[]) => ActivityDTO[],
  ) => {
    setDays((prev) =>
      prev?.map((v) =>
        v.id === day.id ? { ...v, activities: updater(v.activities) } : v,
      ),
    );
  };

  const addDay = useApi<
    ApiHooksRoutes["days"]["day"]["add"]["Def"],
    { tempId: string }
  >({
    hookArgs: {
      accessToken,
      body: activities.map((v) => ({
        ...v,
        state: false,
        description: "",
      })),
    },
    request: Requests.days.day.add,
    requestHandler: requestWithRefresh,
    preCallBack: (args) => {
      const tempId = crypto.randomUUID();
      onAddDay({
        id: tempId,
        activities: args.body.map((v, i) => ({ ...v, id: `ACTIVITY_ID${i}` })),
      });
      return { tempId };
    },
    postCallBack: (data, args) => onUpdateDay(args.tempId, data),
  });

  const deleteDay = useApi<ApiHooksRoutes["days"]["day"]["delete"]["Def"]>({
    hookArgs: { accessToken, dayId },
    request: Requests.days.day.delete,
    requestHandler: requestWithRefresh,
    preCallBack: onDeleteDay,
  });

  return {
    addDay,
    deleteDay,
    setActivities,
  };
};
