import { ApiError, Errors } from "@/lib/core/errors";
import { httpResponse } from "@/lib/http/httpResponse";

export const httpRoute =
  <P extends string = never>(
    handler: (
      req: Request,
      options: { params: Record<P, string> },
    ) => Promise<Response>,
  ) =>
  async (req: Request, options?: { params: Promise<Record<P, string>> }) => {
    try {
      const resolvedParams = await options?.params;

      return await handler(req, {
        params: resolvedParams ?? ({} as Record<P, string>),
      });
    } catch (error: unknown) {
      return error instanceof ApiError
        ? httpResponse.error(error.response)
        : httpResponse.error(Errors.INTERNAL_SERVER_ERROR().response);
    }
  };
