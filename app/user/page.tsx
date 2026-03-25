"use client";
import { useRouter } from "next/navigation";
import { useSession } from "@/client/contexts/SessionContext";
import { useUserData } from "@/client/contexts/UserDataContext";
import { useUser } from "@/app/user/contexts/UserContext";
import { TopBar } from "@/app/user/views/TopBar";
import { UserData } from "@/app/user/views/UserData";
import { UserForm } from "@/app/user/views/UserForm";
import { ConfirmActionButton } from "@/app/user/components/ConfirmActionButton";

export default function UserPage() {
  const router = useRouter();
  const { logout } = useSession();
  const { user } = useUserData();
  const { updateUser, deleteUser } = useUser();

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
        <ConfirmActionButton action="delete" actionHandler={deleteUser.call} />
      </div>
    </div>
  );
}
