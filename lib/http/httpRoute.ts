import { httpResponse } from "@/lib/http/httpResponse";
import { Errors } from "@/lib/core/errors";
import type { NextApiRequest } from "next";
import { ApiError } from "@/types/api/api.types";

export const httpRoute =
  (handler: (req: NextApiRequest) => Promise<Response>) =>
  async (req: NextApiRequest) => {
    try {
      return await handler(req);
    } catch (error: unknown) {
      if (error instanceof ApiError) return httpResponse.error(error.response);

      console.error("Unexpected API Error:", error);
      return httpResponse.error(Errors.INTERNAL_SERVER_ERROR().response);
    }
  };
