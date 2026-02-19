"use client";
import { useMemo, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";

type Mode = "login" | "signup";

export default function AuthPage() {
  const { login, signup } = useAuth();

  const [mode, setMode] = useState<Mode>("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const disabled = useMemo(
    () => isLoading || !username.trim() || !password,
    [isLoading, username, password],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const u = username.trim();

      if (mode === "login") {
        await login({ username: u, password });
      } else {
        if (!signup) throw new Error("Signup is not configured");
        await signup({ username: u, password });

        // optional: auto-switch to login after signup
        setMode("login");
      }
    } catch (err: any) {
      setErrorMsg(err?.message ?? "Auth failed. Try again.");
      console.error("Auth failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-bg-main text-text-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Top label */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-3 py-1">
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
        <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-card shadow-[0_10px_30px_rgba(0,0,0,0.55)]">
          {/* subtle top glow line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[rgba(255,255,255,0.10)] to-transparent" />

          <form onSubmit={handleSubmit} className="p-6 sm:p-7">
            {/* Mode toggle */}
            <div className="mb-5 flex rounded-xl border border-border bg-bg-main p-1">
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null);
                  setMode("login");
                }}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition cursor-pointer ${
                  mode === "login"
                    ? "bg-bg-card text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null);
                  setMode("signup");
                }}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition cursor-pointer ${
                  mode === "signup"
                    ? "bg-bg-card text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Sign up
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 rounded-xl border border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.08)] px-3 py-2 text-sm text-text-primary">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-accent-red shadow-[0_0_10px_rgba(239,68,68,0.35)]" />
                  <p className="text-text-secondary">{errorMsg}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm text-text-secondary">
                  Username
                </label>
                <input
                  type="text"
                  autoComplete="username"
                  placeholder="your_username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-border bg-bg-main px-3 py-2.5 text-text-primary placeholder:text-text-muted outline-none transition
                             focus:border-[rgba(59,130,246,0.45)] focus:ring-4 focus:ring-[rgba(59,130,246,0.12)]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-text-secondary">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-bg-main px-3 py-2.5 text-text-primary placeholder:text-text-muted outline-none transition
                             focus:border-[rgba(59,130,246,0.45)] focus:ring-4 focus:ring-[rgba(59,130,246,0.12)]"
                />
              </div>

              <button
                type="submit"
                disabled={disabled}
                className="group relative w-full overflow-hidden rounded-xl border border-[rgba(59,130,246,0.25)] bg-[rgba(59,130,246,0.12)] px-4 py-2.5 font-semibold text-text-primary transition
                           hover:bg-[rgba(59,130,246,0.18)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
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
              </button>

              {/* Small helper text */}
              <p className="text-center text-xs text-text-secondary">
                {mode === "login" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMsg(null);
                        setMode("signup");
                      }}
                      className="text-text-primary underline underline-offset-4 hover:opacity-80 cursor-pointer"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMsg(null);
                        setMode("login");
                      }}
                      className="text-text-primary underline underline-offset-4 hover:opacity-80 cursor-pointer"
                    >
                      Login
                    </button>
                  </>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
