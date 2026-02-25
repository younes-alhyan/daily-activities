import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api.types";

const successApiResponse = (
  payload: ApiResponse<true, any>,
  refreshToken?: string,
): Response => {
  const response = NextResponse.json(payload, { status: payload.status });

  if (refreshToken) {
    response.cookies.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return response;
};

const errorApiResponse = (payload: ApiResponse<false>): Response => {
  return NextResponse.json(payload, { status: payload.status });
};

export const httpResponse = {
  success: successApiResponse,
  error: errorApiResponse,
};
