import type { HTTP_METHOD } from "next/dist/server/web/http";
import type { User, UserLogin } from "@/types/user.types";
import type { Activities } from "@/types/userActivities.types";

export interface ApiRequest {
  method: HTTP_METHOD;
  url: string;
  token?: string;
  body?: any;
}
export interface ApiSuccess<T> {
  ok: true;
  status: number;
  message: string;
  data?: T;
}
export interface ApiError {
  ok: false;
  status: number;
  code: string;
  message: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type UserResponse = User;
export type UserLoginResponse = UserLogin;
export type UserActivitiesResponse = { userActivities: Activities[] };
