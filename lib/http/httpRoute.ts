import { httpResponse } from "@/lib/http/httpResponse";
import { httpErrors } from "@/lib/http/httpErrors";
import type { ApiError } from "@/types/api.types";

function isApiError(err: unknown): err is ApiError {
  return (
    typeof err === "object" &&
    err !== null &&
    "ok" in err &&
    "status" in err &&
    "code" in err &&
    "message" in err &&
    (err as any).ok === false &&
    typeof (err as any).status === "number" &&
    typeof (err as any).code === "string" &&
    typeof (err as any).message === "string"
  );
}

export const httpRoute =
  (handler: (req: Request) => Promise<Response>) => async (req: Request) => {
    try {
      return await handler(req);
    } catch (error: unknown) {
      return isApiError(error)
        ? httpResponse(error)
        : httpResponse(httpErrors.INTERNAL_SERVER_ERROR());
    }
  };
