import { ApiResponse } from "@/types/api.types";

export class ApiError extends Error {
  response: ApiResponse<false>;
  constructor(response: ApiResponse<false>) {
    super(response.message);
    this.name = "ApiError";
    this.response = response;
  }
}

const createHttpError =
  (status: number, code: string, defaultMessage: string) =>
  (message?: string) =>
    new ApiError({
      ok: false,
      status,
      code,
      message: message ?? defaultMessage,
    });

export const Errors = {
  BAD_REQUEST_ERROR: createHttpError(400, "BAD_REQUEST", "Bad request"),
  UNAUTHORIZED_ERROR: createHttpError(
    401,
    "UNAUTHORIZED",
    "Unauthorized access",
  ),
  FORBIDDEN_ERROR: createHttpError(403, "FORBIDDEN", "Forbidden"),
  NOT_FOUND_ERROR: createHttpError(404, "NOT_FOUND", "Resource not found"),
  CONFLICT_ERROR: createHttpError(409, "CONFLICT", "Resource already exists"),
  INTERNAL_SERVER_ERROR: createHttpError(
    500,
    "INTERNAL_SERVER_ERROR",
    "Internal server error",
  ),
  CLIENT_RUNTIME_ERROR: createHttpError(
    0,
    "CLIENT_RUNTIME_ERROR",
    "Unexpected client error",
  ),
};
