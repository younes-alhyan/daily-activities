import type { UserRequests } from "@/features/user/types";

export const userRequests: UserRequests = {
  get: ({ accessToken }) => ({
    method: "GET",
    url: "/api/user",
    accessToken,
  }),
  update: ({ accessToken, body }) => ({
    method: "PATCH",
    url: "/api/user",
    accessToken,
    body,
  }),
  delete: ({ accessToken }) => ({
    method: "DELETE",
    url: "/api/user",
    accessToken,
  }),
};
