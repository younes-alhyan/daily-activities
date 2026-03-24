import { UserDataProvider } from "@/client/contexts/UserDataContext";
import { UserProvider } from "@/app/user/contexts/UserContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserDataProvider>
      <UserProvider>{children}</UserProvider>
    </UserDataProvider>
  );
}
