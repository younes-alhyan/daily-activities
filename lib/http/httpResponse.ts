import { NextResponse } from "next/server";
import type { ApiError, ApiSuccess } from "@/types/api.types";

export function httpResponse<T>(payload: ApiSuccess<T> | ApiError) {
  return NextResponse.json(payload, { status: payload.status });
}
