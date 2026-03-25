"use client";
import { useState } from "react";
import { AuthCard } from "@/app/auth/components/AuthCard";

export default function AuthPage() {
  const [mode, setMode] = useState<"signup" | "login">("signup");

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Top label */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-accent-green shadow-[0_0_12px_rgba(34,197,94,0.35)]" />
            <span className="text-xs text-text-secondary">Secure access</span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            {mode === "login" ? "Login" : "Sign up"}
          </h1>

          <p className="mt-2 text-sm text-text-secondary">
            {mode === "login"
              ? "Enter your credentials to continue."
              : "Create an account to get started."}
          </p>
        </div>
        
        <AuthCard mode={mode} setMode={setMode} />
      </div>
    </div>
  );
}
