"use client";
import { useState } from "react";
import { Button } from "@/client/components/button";
import { Input } from "@/client/components/input";
import { Label } from "@/client/components/label";
import type { UserInput } from "@/types/user.types";

interface AuthCardProps {
  mode: "login" | "signup";
  setMode: (mode: "login" | "signup") => void;
  authHandler: (body: UserInput) => void;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export function AuthCard({
  mode,
  setMode,
  authHandler,
  isLoading,
  error,
  clearError,
}: AuthCardProps) {
  const [user, setUser] = useState<UserInput>({ username: "", password: "" });

  return (
    
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

        {/* Panel */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_10px_30px_rgba(0,0,0,0.55)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[rgba(255,255,255,0.10)] to-transparent" />

          <div className="p-6 sm:p-7 space-y-4">
            {/* Mode toggle */}
            <div className="mb-5 flex rounded-xl border border-border bg-background p-1">
              <Button
                type="button"
                onClick={() => {
                  clearError();
                  setMode("login");
                }}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold bg-transparent hover:text-primary ${
                  mode === "login" ? "bg-card text-text-primary" : "text-text-secondary"
                }`}
              >
                Login
              </Button>

              <Button
                type="button"
                onClick={() => {
                  clearError();
                  setMode("signup");
                }}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold bg-transparent hover:text-primary ${
                  mode === "signup" ? "bg-card text-text-primary" : "text-text-secondary"
                }`}
              >
                Sign up
              </Button>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 rounded-xl border border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.08)] px-3 py-2 text-sm text-text-primary">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-accent-red shadow-[0_0_10px_rgba(239,68,68,0.35)]" />
                  <p className="text-text-secondary">{error}</p>
                </div>
              </div>
            )}

            {/* Username */}
            <div>
              <Label className="mb-1.5 block text-sm text-text-secondary">
                Username
              </Label>

              <Input
                autoComplete="username"
                placeholder="your_username"
                value={user.username}
                onChange={(e) =>
                  setUser({ username: e.target.value, password: user.password })
                }
                className="w-full rounded-xl border border-border bg-primary px-3 py-2.5 text-text-primary placeholder:text-text-muted"
              />
            </div>

            {/* Password */}
            <div>
              <Label className="mb-1.5 block text-sm text-text-secondary">
                Password
              </Label>

              <Input
                type="password"
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                placeholder="••••••••"
                value={user.password}
                onChange={(e) =>
                  setUser({ username: user.username, password: e.target.value })
                }
                className="w-full rounded-xl border border-border bg-primary px-3 py-2.5 text-text-primary placeholder:text-text-muted"
              />
            </div>

            {/* Submit */}
            <Button
              type="button"
              onClick={() => authHandler(user)}
              disabled={
                isLoading || !user.username.trim() || !user.password.trim()
              }
              className="group relative w-full overflow-hidden rounded-xl border border-[rgba(59,130,246,0.25)] bg-[rgba(59,130,246,0.12)] px-4 py-2.5 font-semibold text-text-primary transition hover:bg-[rgba(59,130,246,0.18)]"
            >
              <span className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25),transparent_60%)]" />

              <span className="relative">
                {isLoading
                  ? mode === "login"
                    ? "Logging in..."
                    : "Creating account..."
                  : mode === "login"
                    ? "Login"
                    : "Sign up"}
              </span>
            </Button>

            {/* Footer */}
            <p className="text-center text-xs text-text-secondary">
              {mode === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-text-primary underline underline-offset-4"
                    onClick={() => {
                      clearError();
                      setMode("signup");
                    }}
                  >
                    Sign up
                  </Button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-text-primary underline underline-offset-4"
                    onClick={() => {
                      clearError();
                      setMode("login");
                    }}
                  >
                    Login
                  </Button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
  );
}
