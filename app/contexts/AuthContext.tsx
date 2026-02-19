"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { httpRequest } from "@/lib/http/httpRequest";
import LoadingPage from "@/app/components/LoadingPage";
import { UserInterface } from "@/types/user.types";
import type {
  ApiRequest,
  UserResponse,
  UserLoginResponse,
} from "@/types/api.types";

type AuthContextType = {
  token: string;
  signup: (user: UserInterface) => Promise<void>;
  login: (user: UserInterface) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: "",
  signup: async () => {},
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const goTo = (path: string) => {
    if (pathname !== path) {
      router.push(path);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || "";
    setToken(storedToken);

    const targetPath = storedToken ? "/" : "/auth";

    if (pathname !== targetPath) {
      router.replace(targetPath);
      return;
    }

    setIsLoading(false);
  }, [pathname, router]);

  const signup = async (user: UserInterface) => {
    const request: ApiRequest = {
      url: "/api/user/signup",
      method: "POST",
      body: user,
    };
    const res = await httpRequest<UserResponse>(request);

    if (!res.ok) throw new Error(res.message);

    login(user);
  };

  const login = async (user: UserInterface) => {
    const request: ApiRequest = {
      url: "/api/user/login",
      method: "POST",
      body: user,
    };
    const res = await httpRequest<UserLoginResponse>(request);

    if (!res.ok) throw new Error(res.message);
    if (!res.data) throw new Error("Missing Response Data");

    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    goTo("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    goTo("/auth");
  };

  if (isLoading) return <LoadingPage />;

  return (
    <AuthContext.Provider value={{ token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
