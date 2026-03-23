import type { AuthResponses } from "@/features/auth/types";

export const authResponses: AuthResponses = {
  signup: () => ({
    ok: true,
    status: 201,
    message: "Signup successful",
  }),

  login: (data) => ({
    ok: true,
    status: 200,
    message: "Login successful",
    data,
  }),

  refresh: (data) => ({
    ok: true,
    status: 200,
    message: "Token refreshed successfully",
    data,
  }),
};
