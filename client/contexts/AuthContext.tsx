"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useApi } from "@/client/hooks/useApi";
import { httpRequest } from "@/lib/http/httpRequest";
import { Errors } from "@/lib/core/errors";
import { Requests } from "@/lib/core/requests";
import { LoadingPage } from "@/app/LoadingPage";
import { ApiError } from "@/types/api.types";
import type { ApiHooksRoutes } from "@/types/apiHooks.types";
import type { ApiRequest, ApiResponse } from "@/types/api.types";

type AuthContextType = {
  accessToken: string;
  signup: ApiHooksRoutes["auth"]["signup"]["Hook"];
  login: ApiHooksRoutes["auth"]["login"]["Hook"];
  requestWithRefresh: <T>(
    request: ApiRequest<true, any>,
  ) => Promise<ApiResponse<true, T>>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const router = useRouter();

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

  const signup = useApi<ApiHooksRoutes["auth"]["signup"]["Def"]>({
    request: Requests.auth.signup,
    requestHandler: httpRequest,
  });

  const login = useApi<ApiHooksRoutes["auth"]["login"]["Def"]>({
    request: Requests.auth.login,
    requestHandler: httpRequest,
    postCallBack: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      setAccessToken(data.accessToken);
      router.replace("/");
    },
  });

  const refresh = useApi<ApiHooksRoutes["auth"]["refresh"]["Def"]>({
    request: Requests.auth.refresh,
    requestHandler: httpRequest,
    postCallBack: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      setAccessToken(data.accessToken);
    },
  });

  async function requestWithRefresh<T = any>(
    request: ApiRequest<true, any>,
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
      } catch (err: unknown) {
        logout();
        throw err;
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken("");
    router.replace("/auth");
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, signup, login, requestWithRefresh, logout }}
    >
      {isLoading ? <LoadingPage /> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
