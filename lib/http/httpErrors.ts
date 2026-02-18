import type { ApiError } from "@/types/api.types";

const BAD_REQUEST_ERROR: (message?: string) => ApiError = (
  message?: string,
) => ({
  ok: false,
  status: 400,
  code: "BAD_REQUEST",
  message: message || "Bad request",
});

const UNAUTHORIZED_ERROR: (message?: string) => ApiError = (
  message?: string,
) => ({
  ok: false,
  status: 401,
  code: "UNAUTHORIZED",
  message: message || "Unauthorized access",
});

const FORBIDDEN_ERROR: (message?: string) => ApiError = (message?: string) => ({
  ok: false,
  status: 403,
  code: "FORBIDDEN",
  message: message || "Forbidden",
});

const NOT_FOUND_ERROR: (message?: string) => ApiError = (message?: string) => ({
  ok: false,
  status: 404,
  code: "NOT_FOUND",
  message: message || "Resource not found",
});

const CONFLICT_ERROR = (message?: string): ApiError => ({
  ok: false,
  status: 409,
  code: "CONFLICT",
  message: message || "Resource already exists",
});

const INTERNAL_SERVER_ERROR: (message?: string) => ApiError = (
  message?: string,
) => ({
  ok: false,
  status: 500,
  code: "INTERNAL_SERVER_ERROR",
  message: message || "Internal server error",
});

const CLIENT_RUNTIME_ERROR: (message?: string) => ApiError = (
  message?: string,
) => ({
  ok: false,
  status: 0,
  code: "CLIENT_RUNTIME_ERROR",
  message: message || "Unexpected client error",
});

export const httpErrors = {
  BAD_REQUEST_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  INTERNAL_SERVER_ERROR,
  CLIENT_RUNTIME_ERROR,
};
