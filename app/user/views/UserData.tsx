import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/client/components/card";
import type { UserDTO } from "@/types/user.types";

interface UserDataProps {
  user: UserDTO;
}

export function UserData({ user }: UserDataProps) {
  return (
    <Card className="w-full max-w-2xl border border-border">
      <CardHeader>
        <CardTitle className="text-xl">Identity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-text-secondary text-lg">User ID</p>
          <p className="text-text-primary font-medium">{user.id}</p>
        </div>

        <div>
          <p className="text-text-secondary text-lg">Username</p>
          <p className="text-text-primary font-medium">{user.username}</p>
        </div>
      </CardContent>
    </Card>
  );
}
