import { httpResponse } from "@/lib/http/httpResponse";
import { Errors } from "@/lib/core/errors";
import type { NextRequest } from "next/server";
import { ApiError } from "@/types/api/api.types";

export const httpRoute =
  (handler: (req: NextRequest) => Promise<Response>) =>
  async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (error: unknown) {
      if (error instanceof ApiError) return httpResponse.error(error.response);

      console.error("Unexpected API Error:", error);
      return httpResponse.error(Errors.INTERNAL_SERVER_ERROR().response);
    }
  };
