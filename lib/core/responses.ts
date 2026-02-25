import type { ApiResponse } from "@/types/api.types";
import type { ResponseRoutes } from "@/types/routes.types";

const successApiResponse = (
  status: number,
  message: string,
): ApiResponse<true> => ({
  ok: true,
  status,
  message,
});

export const Responses: ResponseRoutes = {
  auth: {
    signup: () => ({
      ...successApiResponse(201, "Signup successful"),
    }),
    login: (data) => ({
      ...successApiResponse(200, "Login successful"),
      data,
    }),
    refresh: (data) => ({
      ...successApiResponse(200, "Token refreshed successfully"),
      data,
    }),
  },

  user: {
    get: (data) => ({
      ...successApiResponse(200, "User retrieved successfully"),
      data,
    }),
    update: (data) => ({
      ...successApiResponse(200, "User updated successfully"),
      data,
    }),
    delete: () => ({
      ...successApiResponse(200, "User deleted successfully"),
    }),
  },

  userActivities: {
    get: (data) => ({
      ...successApiResponse(200, "User activities retrieved successfully"),
      data,
    }),
  },

  activities: {
    add: (data) => ({
      ...successApiResponse(201, "Activities added successfully"),
      data,
    }),
    delete: () => ({
      ...successApiResponse(200, "Activities deleted successfully"),
    }),
  },

  activity: {
    add: (data) => ({
      ...successApiResponse(201, "Activity added successfully"),
      data,
    }),
    update: (data) => ({
      ...successApiResponse(200, "Activity updated successfully"),
      data,
    }),
    reorder: () => ({
      ...successApiResponse(200, "Activity reordered successfully"),
    }),
    delete: () => ({
      ...successApiResponse(200, "Activity deleted successfully"),
    }),
  },
};
