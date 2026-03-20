"use client";
import { useState } from "react";
import { Requests } from "@/lib/core/requests";
import { useAuth } from "@/client/contexts/AuthContext";
import { useApi } from "@/client/hooks/useApi";
import type { ApiHooksRoutes } from "@/types/core/api-hooks.types";
import type { UserDTO } from "@/types/modules/user.types";

export function useUser() {
  const [user, setUser] = useState<UserDTO>({ id: "", username: "" });
  const { accessToken, requestWithRefresh, logout } = useAuth();

  const getUser = useApi<ApiHooksRoutes["user"]["get"]["Def"]>({
    hookArgs: { accessToken },
    request: Requests.user.get,
    requestHandler: requestWithRefresh,
    postCallBack: (data) => setUser(data),
  });

  const updateUser = useApi<ApiHooksRoutes["user"]["update"]["Def"]>({
    hookArgs: { accessToken },
    request: Requests.user.update,
    requestHandler: requestWithRefresh,
    preCallBack: (args) => setUser((prev) => ({ ...prev, ...args.body })),
  });

  const deleteUser = useApi<ApiHooksRoutes["user"]["delete"]["Def"]>({
    hookArgs: { accessToken },
    request: Requests.user.delete,
    requestHandler: requestWithRefresh,
    preCallBack: logout,
  });

  return { user, getUser, updateUser, deleteUser };
}
