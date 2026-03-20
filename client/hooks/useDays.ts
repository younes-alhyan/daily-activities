"use client";
import { useState } from "react";
import { Requests } from "@/lib/core/requests";
import { useAuth } from "@/client/contexts/AuthContext";
import { useApi } from "@/client/hooks/useApi";
import type { ApiHooksRoutes } from "@/types/core/api-hooks.types";
import type { DayDTO } from "@/types/modules/day.types";

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
