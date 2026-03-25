"use client";
import { useState } from "react";
import { Button } from "@/client/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/client/components/ui/card";
import { Input } from "@/client/components/ui/input";
import { Label } from "@/client/components/ui/label";
import type { UserInput, UserDTO } from "@/modules/types/user.types";

interface UserFormProps {
  user: UserDTO;
  updateUser: (body: Partial<UserInput>) => void;
}

export function UserForm({ user, updateUser }: UserFormProps) {
  const [userInput, setUserInput] = useState<UserInput>({
    username: user.username,
    password: "",
  });

  const updateUserHandler = (input: UserInput) => {
    if (!input.username.trim() && !input.password.trim()) return;
    updateUser(input);
  };

  return (
    <Card className="w-full max-w-2xl border border-border">
      <CardHeader>
        <CardTitle className="text-xl">Update Account</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Username field */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="username" className="text-text-secondary text-sm">
            Username
          </Label>
          <Input
            id="username"
            value={userInput.username}
            onChange={(e) =>
              setUserInput({ ...userInput, username: e.target.value })
            }
            className="w-full"
          />
        </div>

        {/* New Password field */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password" className="text-text-secondary text-sm">
            New Password
          </Label>
          <Input
            id="password"
            type="password"
            value={userInput.password}
            onChange={(e) =>
              setUserInput({ ...userInput, password: e.target.value })
            }
            className="w-full"
          />
        </div>

        {/* Save Changes button */}
        <Button
          onClick={() => updateUserHandler(userInput)}
          className="mt-3 bg-accent-green text-shadow-text-primary"
        >
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}
