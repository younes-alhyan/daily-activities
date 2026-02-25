import { ApiError, Errors } from "@/lib/core/errors";
import type { ApiRequest, ApiResponse } from "@/types/api.types";

async function fetchHelper(url: string, init: RequestInit): Promise<Response> {
  try {
    return await fetch(url, init);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown fetch error";
    throw Errors.CLIENT_RUNTIME_ERROR(`Fetch failed: ${msg}`);
  }
}

async function parseJsonHelper<T>(
  res: Response,
): Promise<ApiResponse<true, T>> {
  let apiResponse: ApiResponse<true, T> | ApiResponse<false>;

  try {
    apiResponse = await res.json();
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : "Unknown JSON parse error";
    throw Errors.CLIENT_RUNTIME_ERROR(`JSON parse failed: ${msg}`);
  }

  if (!apiResponse.ok) throw new ApiError(apiResponse);
  return apiResponse;
}

export async function httpRequest<T = undefined>(
  request: ApiRequest | ApiRequest<true, any>,
): Promise<ApiResponse<true, T>> {
  const { method, url } = request;

  const headers: HeadersInit = {};
  if ("token" in request && request.token) {
    headers["Authorization"] = `Bearer ${request.token}`;
  }

  const body = "body" in request && request.body ? request.body : undefined;
  const hasBody = body !== undefined && method !== "GET";
  if (hasBody) headers["Content-Type"] = "application/json";

  const res = await fetchHelper(url, {
    method,
    headers,
    ...(hasBody ? { body: JSON.stringify(body) } : {}),
    credentials: "include",
  });

  return await parseJsonHelper<T>(res);
}
