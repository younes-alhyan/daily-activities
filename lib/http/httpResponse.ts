import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api.types";

const successApiResponse = (
  payload: ApiResponse<true, object | null>,
  refreshToken?: string,
) => {
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

const errorApiResponse = (payload: ApiResponse<false>) => {
  return NextResponse.json(payload, { status: payload.status });
};

export const httpResponse = {
  success: successApiResponse,
  error: errorApiResponse,
};
