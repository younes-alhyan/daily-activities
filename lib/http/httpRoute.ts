import { httpResponse } from "@/lib/http/httpResponse";
import { ApiError, Errors } from "@/lib/utils/errors";
import type { NextRequest, NextResponse } from "next/server";

type HandlerT = (
  req: NextRequest,
  params: Record<string, string>,
) => Promise<NextResponse>;

export function httpRoute(handler: HandlerT) {
  return async (
    req: NextRequest,
    { params }: { params: Promise<Record<string, string>> },
  ) => {
    try {
      const routeParams = await params;
      return await handler(req, routeParams);
    } catch (error: unknown) {
      if (error instanceof ApiError) return httpResponse.error(error.response);

      console.error("Unexpected API Error:", error);
      return httpResponse.error(Errors.INTERNAL_SERVER_ERROR().response);
    }
  };
}
