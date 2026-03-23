import type { UserResponses } from "@/features/user/types";

export const userResponses: UserResponses = {
  get: (data) => ({
    ok: true,
    status: 200,
    message: "User retrieved successfully",
    data,
  }),

  update: (data) => ({
    ok: true,
    status: 200,
    message: "User updated successfully",
    data,
  }),

  delete: () => ({
    ok: true,
    status: 200,
    message: "User deleted successfully",
  }),
};
