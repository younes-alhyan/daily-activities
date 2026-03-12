"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/client/contexts/AuthContext";
import { useUser } from "@/client/hooks/useUser";
import { UserView } from "@/client/views/UserView";
import { LoadingPageComponent } from "@/client/components/LoadingComponent";
import type { UserDTO } from "@/types/user.types";

export default function UserPage() {
  const [userDTO, setUserDTO] = useState<UserDTO>({
    id: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useAuth();
  const { getUser } = useUser();

  useEffect(() => {
    getUser()
      .then((userDTO) => setUserDTO(userDTO))
      .catch((error: unknown) => logout())
      .finally(() => setIsLoading(false));
  }, [logout, getUser]);

  const onUpdateUserDTO = (userDTO: UserDTO) => setUserDTO(userDTO);

  if (isLoading) return <LoadingPageComponent />;
  return <UserView userDTO={userDTO} onUpdateUserDTO={onUpdateUserDTO} />;
}
