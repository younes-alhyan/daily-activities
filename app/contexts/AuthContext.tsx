"use client";

import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import LoadingPage from "../components/LoadingPage";

type AuthContextType = {
  token: string;
  login: (username: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [token, setToken] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
    }

    setIsLoaded(true);
  }, []);

  const login = async (username: string, password: string) => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Login failed");
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    setToken(data.token);
    goTo("/");
  };

  return (
    <AuthContext.Provider value={{ token, login }}>
      {isLoaded ? children : <LoadingPage />}
    </AuthContext.Provider>
  );
}
