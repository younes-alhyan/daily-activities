"use client";
import { createContext, useContext, useState } from "react";
import { daysHooks, daysRequests } from "@/features/days";
import { useSession } from "@/client/contexts/SessionContext";
import type { SetStateAction } from "react";
import type { DayDTO } from "@/modules/types/day.types";

type DaysContextType = {
  days: DayDTO[];
  setDays: React.Dispatch<SetStateAction<DayDTO[]>>;
  getDays: ReturnType<typeof daysHooks.get>;
  addDay: ReturnType<typeof daysHooks.add>;
};

const DaysContext = createContext<DaysContextType | undefined>(undefined);

export function DaysProvider({ children }: { children: React.ReactNode }) {
  const [days, setDays] = useState<DayDTO[]>([]);
  const { accessToken, requestWithRefresh } = useSession();

  const getDays = daysHooks.get({
    hookArgs: { accessToken },
    requestConstructor: daysRequests.get,
    requestHandler: requestWithRefresh,
    postCallBack: ({ data }) => setDays(data),
  });

  const addDay = daysHooks.add({
    hookArgs: { accessToken },
    requestConstructor: daysRequests.add,
    requestHandler: requestWithRefresh,
    preCallBack: ({ body }) => {
      const tempId = crypto.randomUUID();
      setDays((prev) => [
        ...prev,
        {
          id: tempId,
          activities: body.map((v, i) => ({ ...v, id: `ACTIVITY_ID${i}` })),
        },
      ]);
      return { tempId };
    },
    postCallBack: ({ args, data }) => {
      setDays((prev) => prev.map((v) => (v.id === args.tempId ? data : v)));
    },
  });

  return (
    <DaysContext.Provider value={{ days, setDays, getDays, addDay }}>
      {children}
    </DaysContext.Provider>
  );
}

export function useDays() {
  const ctx = useContext(DaysContext);
  if (!ctx) {
    throw new Error("useDays must be used inside DaysProvider");
  }
  return ctx;
}
