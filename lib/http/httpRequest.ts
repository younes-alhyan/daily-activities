import { httpErrors } from "@/lib/http/httpErrors";
import type {
  ApiRequest,
  ApiResponse,
  ApiSuccess,
  ApiError,
} from "@/types/api.types";

async function fetchHelper(
  url: string,
  init: RequestInit,
): Promise<Response | ApiError> {
  try {
    return await fetch(url, init);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown fetch error";
    return httpErrors.CLIENT_RUNTIME_ERROR(`Fetch failed: ${msg}`);
  }
}

async function parseJsonHelper<T>(
  res: Response,
): Promise<ApiSuccess<T> | ApiError> {
  try {
    return (await res.json()) as ApiSuccess<T> | ApiError;
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : "Unknown JSON parse error";
    return httpErrors.CLIENT_RUNTIME_ERROR(`JSON parse failed: ${msg}`);
  }
}

export async function httpRequest<T>(
  request: ApiRequest,
): Promise<ApiResponse<T>> {
  const { method, url, token, body } = request;

  const headers: HeadersInit = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const hasBody = body !== undefined && method !== "GET";
  if (hasBody) headers["Content-Type"] = "application/json";

  const res = await fetchHelper(url, {
    method,
    headers,
    ...(hasBody ? { body: JSON.stringify(body) } : {}),
  });
  if (!(res instanceof Response)) return res;

  return await parseJsonHelper<T>(res);
}
