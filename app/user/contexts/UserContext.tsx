"use client"
import { createContext, useContext } from "react";
import { userHooks, userRequests } from "@/features/user";
import { useSession } from "@/client/contexts/SessionContext";
import { useUserData } from "@/client/contexts/UserDataContext";

type UserContextType = {
  updateUser: ReturnType<typeof userHooks.update>;
  deleteUser: ReturnType<typeof userHooks.delete>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { accessToken, requestWithRefresh, logout } = useSession();
  const { setUser } = useUserData();

  const updateUser = userHooks.update({
    hookArgs: { accessToken },
    requestConstructor: userRequests.update,
    requestHandler: requestWithRefresh,
    preCallBack: ({ body }) => setUser((user) => ({ ...user, ...body })),
  });

  const deleteUser = userHooks.delete({
    hookArgs: { accessToken },
    requestConstructor: userRequests.delete,
    requestHandler: requestWithRefresh,
    preCallBack: logout,
  });

  return (
    <UserContext.Provider value={{ updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return ctx;
}
