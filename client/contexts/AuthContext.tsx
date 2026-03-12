"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { httpRequest } from "@/lib/http/httpRequest";
import { ApiError, Errors } from "@/lib/core/errors";
import { Requests } from "@/lib/core/requests";
import { LoadingPageComponent } from "@/client/components/LoadingComponent";
import type { ApiRequest, ApiResponse } from "@/types/api.types";
import type { UserInput } from "@/types/user.types";

type AuthContextType = {
  token: string;
  signup: (user: UserInput) => Promise<void>;
  login: (user: UserInput) => Promise<void>;
  logout: () => void;
  requestWithRefresh: <T>(
    request: ApiRequest<true, any>,
  ) => Promise<ApiResponse<true, T>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || "";
    setToken(storedToken);

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

  const signup = async (user: UserInput) => {
    await httpRequest(Requests.auth.signup(user));
    await login(user);
  };

  const login = async (user: UserInput) => {
    const res = await httpRequest<{ token: string }>(Requests.auth.login(user));
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    router.replace("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    router.replace("/auth");
  };

  const refresh = async (): Promise<string> => {
    const res = await httpRequest<{ token: string }>(Requests.auth.refresh());
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    return res.data.token;
  };

  async function requestWithRefresh<T = undefined>(
    request: ApiRequest<true, any>,
  ): Promise<ApiResponse<true, T>> {
    try {
      return await httpRequest<T>(request);
    } catch (error: unknown) {
      if (!(error instanceof ApiError)) throw Errors.CLIENT_RUNTIME_ERROR();
      if (error.response.status !== 401) throw error;
      try {
        const newToken = await refresh();
        return httpRequest<T>({
          ...request,
          token: newToken,
        });
      } catch (error: unknown) {
        logout();
        throw error;
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{ token, signup, login, logout, requestWithRefresh }}
    >
      {isLoading ? <LoadingPageComponent /> : children}
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
