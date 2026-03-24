"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";
import { httpRequest } from "@/lib/http/httpRequest";
import { authRequests, authHooks } from "@/features/auth";
import { useSession } from "@/client/contexts/SessionContext";

type AuthContextType = {
  signup: ReturnType<typeof authHooks.signup>;
  login: ReturnType<typeof authHooks.login>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { setAccessToken } = useSession();

  const signup = authHooks.signup({
    requestConstructor: authRequests.signup,
    requestHandler: httpRequest,
  });

  const login = authHooks.login({
    requestConstructor: authRequests.login,
    requestHandler: httpRequest,
    postCallBack: ({ data }) => {
      localStorage.setItem("accessToken", data.accessToken);
      setAccessToken(data.accessToken);
      router.replace("/");
    },
  });

  return (
    <AuthContext.Provider value={{ signup, login }}>
      {children}
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
