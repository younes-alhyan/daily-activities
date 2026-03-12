"use client"
import { useAuth } from "@/client/contexts/AuthContext";
import { Requests } from "@/lib/core/requests";
import type { UserInput, UserDTO } from "@/types/user.types";

export function useUser() {
  const { token, logout, requestWithRefresh } = useAuth();

  const getUser = async () => {
    const res = await requestWithRefresh<UserDTO>(Requests.user.get(token));
    return res.data;
  };

  const updateUser = async (body: Partial<UserInput>) => {
    const res = await requestWithRefresh<UserDTO>(
      Requests.user.update(token, body),
    );
    return res.data;
  };

  const deleteUser = async () => {
    await requestWithRefresh(Requests.user.delete(token));
    logout();
  };

  return { getUser, updateUser, deleteUser };
}
