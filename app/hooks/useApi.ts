"use client";
import { httpRequest } from "@/lib/http/httpRequest";
import { useAuth } from "@/app/contexts/AuthContext";
import type { ApiRequest, UserActivitiesResponse } from "@/types/api.types";

export default function useApi() {
  const { token } = useAuth();

  async function getUserActivities(): Promise<UserActivitiesResponse> {
    const request: ApiRequest = {
      url: "/api/userActivities",
      method: "GET",
      token,
    };
    const res = await httpRequest<UserActivitiesResponse>(request);

    if (!res.ok) throw new Error(res.message);
    if (!res.data) throw new Error("Missing Response Data");

    return res.data;
  }

  async function addActivities(): Promise<UserActivitiesResponse> {
    const request: ApiRequest = {
      url: "/api/userActivities",
      method: "POST",
      token,
    };
    const res = await httpRequest<UserActivitiesResponse>(request);

    if (!res.ok) throw new Error(res.message);
    if (!res.data) throw new Error("Missing Response Data");

    return res.data;
  }

  async function deleteActivities(id: string): Promise<void> {
    const request: ApiRequest = {
      url: `/api/userActivities?id=${id}`,
      method: "DELETE",
      token,
    };
    const res = await httpRequest(request);

    if (!res.ok) throw new Error(res.message);
  }

  async function updateActivities(
    id: string,
    activityId: string,
    description: string,
    state: boolean,
  ): Promise<UserActivitiesResponse> {
    const request: ApiRequest = {
      url: "/api/userActivities",
      method: "PUT",
      token,
      body: { id, activityId, description, state },
    };
    const res = await httpRequest<UserActivitiesResponse>(request);

    if (!res.ok) throw new Error(res.message);
    if (!res.data) throw new Error("Missing Response Data");

    return res.data;
  }

  return {
    getUserActivities,
    addActivities,
    deleteActivities,
    updateActivities,
  };
}
