export interface ApiError {
  status: number;
  code: string;
  message: string;
}

export const BAD_REQUEST_ERROR: (message?: string) => ApiError = (
  message?: string,
) => ({
  status: 400,
  code: "BAD_REQUEST",
  message: message || "Bad request",
});

export const UNAUTHORIZED_ERROR: (message?: string) => ApiError = (
  message?: string,
) => ({
  status: 401,
  code: "UNAUTHORIZED",
  message: message || "Unauthorized access",
});

export const FORBIDDEN_ERROR: (message?: string) => ApiError = (
  message?: string,
) => ({
  status: 403,
  code: "FORBIDDEN",
  message: message || "Forbidden",
});

export const NOT_FOUND_ERROR: (message?: string) => ApiError = (
  message?: string,
) => ({
  status: 404,
  code: "NOT_FOUND",
  message: message || "Resource not found",
});

export const INTERNAL_SERVER_ERROR: (message?: string) => ApiError = (
  message?: string,
) => ({
  status: 500,
  code: "INTERNAL_SERVER_ERROR",
  message: message || "Internal server error",
});
