"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { userHooks, userRequests } from "@/features/user";
import { useSession } from "@/client/contexts/SessionContext";
import { LoadingPage } from "@/client/components/LoadingPage";
import type { SetStateAction } from "react";
import type { UserDTO } from "@/modules/types/user.types";

type UserDataContextType = {
  user: UserDTO;
  setUser: React.Dispatch<SetStateAction<UserDTO>>;
};

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined,
);

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDTO>({ id: "", username: "" });
  const { accessToken, requestWithRefresh } = useSession();

  const getUser = userHooks.get({
    hookArgs: { accessToken },
    requestConstructor: userRequests.get,
    requestHandler: requestWithRefresh,
    postCallBack: ({ data }) => setUser(data),
  });

  useEffect(() => {
    getUser.clearError();
    getUser.call();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (getUser.isLoading) return <LoadingPage />;
  if (getUser.error) return <h1>Error getting user</h1>;
  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const ctx = useContext(UserDataContext);
  if (!ctx) {
    throw new Error("useUserData must be used inside UserDataProvider");
  }
  return ctx;
}
