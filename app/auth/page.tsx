"use client";
import { useState } from "react";
import { useAuth } from "@/client/contexts/AuthContext";
import { AuthCard } from "./components/AuthCard";

export default function AuthPage() {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const { signup, login } = useAuth();

  const authAction = mode === "signup" ? signup : login;

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <AuthCard
        mode={mode}
        setMode={setMode}
        authHandler={(body) => {authAction.call({ body })}}
        isLoading={authAction.isLoading}
        error={authAction.error && authAction.error.response.message}
        clearError={authAction.clearError}
      />
    </div>
  );
}
