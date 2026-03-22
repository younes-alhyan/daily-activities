"use client";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { httpRequest } from "@/lib/http/httpRequest";
import { ApiError, Errors } from "@/lib/utils/errors";
import { authRequests, authHooks } from "@/features/auth";
import { LoadingPage } from "@/client/components/LoadingPage";
import type { SetStateAction } from "react";
import type { ApiRequest, ApiResponse } from "@/types/api.types";

type SessionContextType = {
  accessToken: string;
  setAccessToken: React.Dispatch<SetStateAction<string>>;
  requestWithRefresh: <T = null>(
    request: ApiRequest<true, object | null>,
  ) => Promise<ApiResponse<true, T>>;
  logout: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken") || "";
    setAccessToken(storedToken);

    const isAuthPage = pathname.startsWith("/auth");

    if (!storedToken && !isAuthPage) {
      router.replace("/auth");
      return;
    }

    if (storedToken && isAuthPage) {
      router.replace("/");
      return;
    }

    setIsLoading(false);
  }, [pathname, router]);

  const refresh = authHooks.refresh({
    requestConstructor: authRequests.refresh,
    requestHandler: httpRequest,
    postCallBack: ({ data }) => {
      localStorage.setItem("accessToken", data.accessToken);
      setAccessToken(data.accessToken);
    },
  });

  async function requestWithRefresh<T = null>(
    request: ApiRequest<true, object | null>,
  ): Promise<ApiResponse<true, T>> {
    try {
      return await httpRequest<T>(request);
    } catch (error: unknown) {
      if (!(error instanceof ApiError)) throw Errors.CLIENT_RUNTIME_ERROR();
      if (error.response.status !== 401) throw error;

      try {
        const { error, call } = refresh;
        const res = await call();

        if (!res) throw error ?? Errors.CLIENT_RUNTIME_ERROR();

        return await httpRequest<T>({
          ...request,
          accessToken: res.data.accessToken,
        });
      } catch (error: unknown) {
        logout();
        throw error;
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken("");
    router.replace("/auth");
  };

  if (isLoading) return <LoadingPage />;
  return (
    <SessionContext.Provider
      value={{ accessToken, setAccessToken, requestWithRefresh, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used inside SessionProvider");
  }
  return ctx;
}
