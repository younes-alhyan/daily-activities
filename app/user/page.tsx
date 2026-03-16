"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/client/contexts/AuthContext";
import { useUser } from "@/client/hooks/useUser";
import { TopBar } from "./views/TopBar";
import { UserData } from "./views/UserData";
import { UserForm } from "./views/UserForm";
import { ConfirmActionButton } from "./components/ConfirmActionButton";
import { LoadingPage } from "@/app/LoadingPage";

export default function UserPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const { user, getUser, updateUser, deleteUser } = useUser();

  useEffect(() => {
    getUser.call();
  }, []);

  if (getUser.isLoading) return <LoadingPage />;
  if (getUser.error) return <h1>Error getting user</h1>;
  if (!user) return <LoadingPage />;

  return (
    <div className="min-h-screen flex justify-center px-4 py-8">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <TopBar goBack={() => router.replace("/")} />
        <UserData user={user} />
        <UserForm
          user={user}
          updateUser={(body) => updateUser.call({ body })}
        />
          <ConfirmActionButton action="logout" actionHandler={logout} />
          <ConfirmActionButton
            action="delete"
            actionHandler={deleteUser.call}
          />
      </div>
    </div>
  );
}
