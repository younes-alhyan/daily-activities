import type { AuthRequests } from "@/features/auth/types";

export const authRequests: AuthRequests = {
  signup: ({ body }) => ({
    method: "POST",
    url: "/api/auth/signup",
    body,
  }),
  login: ({ body }) => ({
    method: "POST",
    url: "/api/auth/login",
    body,
  }),
  refresh: () => ({
    method: "POST",
    url: "/api/auth/refresh",
  }),
};
