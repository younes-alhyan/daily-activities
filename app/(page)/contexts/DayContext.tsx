"use client";
import { createContext, useContext } from "react";
import { dayHooks, dayRequests } from "@/features/day";
import { useSession } from "@/client/contexts/SessionContext";
import type { SetStateAction } from "react";
import type { DayDTO } from "@/modules/types/day.types";

type DayContextType = {
  setDay: (updater: (prev: DayDTO) => DayDTO) => void;
  deleteDay: ReturnType<typeof dayHooks.delete>;
};

const DayContext = createContext<DayContextType | undefined>(undefined);

export function DayProvider({
  dayId,
  setDays,
  children,
}: {
  dayId: string;
  setDays: React.Dispatch<SetStateAction<DayDTO[]>>;
  children: React.ReactNode;
}) {
  const { accessToken, requestWithRefresh } = useSession();

  const setDay = (updater: (prev: DayDTO) => DayDTO) => {
    setDays((prev) => prev.map((v) => (v.id === dayId ? updater(v) : v)));
  };

  const deleteDay = dayHooks.delete({
    hookArgs: { accessToken, dayId },
    requestConstructor: dayRequests.delete,
    requestHandler: requestWithRefresh,
    preCallBack: ({ dayId }) => {
      setDays((prev) => prev.filter((v) => v.id !== dayId));
    },
  });

  return (
    <DayContext.Provider value={{ setDay, deleteDay }}>
      {children}
    </DayContext.Provider>
  );
}

export function useDay() {
  const ctx = useContext(DayContext);
  if (!ctx) {
    throw new Error("useDay must be used inside DayProvider");
  }
  return ctx;
}
