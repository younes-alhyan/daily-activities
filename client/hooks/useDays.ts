"use client";
import { useState } from "react";
import { useAuth } from "@/client/contexts/AuthContext";
import { useApi } from "@/client/hooks/useApi";
import { Requests } from "@/lib/core/requests";
import type { ApiHooksRoutes } from "@/types/apiHooks.types";
import type { DayDTO } from "@/types/day.types";

export const useDays = () => {
  const [days, setDays] = useState<DayDTO[] | undefined>(undefined);
  const { accessToken, requestWithRefresh } = useAuth();

  const getDays = useApi<ApiHooksRoutes["days"]["get"]["Def"]>({
    hookArgs: { accessToken },
    request: Requests.days.get,
    requestHandler: requestWithRefresh,
    postCallBack: setDays,
  });

  return { days, setDays, getDays };
};
