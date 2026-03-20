"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/client/contexts/AuthContext";
import { useUser } from "@/client/hooks/useUser";
import { LoadingPage } from "@/client/components/LoadingPage";
import { ConfirmActionButton } from "@/app/user/components/ConfirmActionButton";
import { TopBar } from "@/app/user/views/TopBar";
import { UserData } from "@/app/user/views/UserData";
import { UserForm } from "@/app/user/views/UserForm";

export default function UserPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const { user, getUser, updateUser, deleteUser } = useUser();

  useEffect(() => {
    getUser.call();
  }, [getUser]);

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
