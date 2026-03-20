"use client";
import { LogOut, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/client/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/client/components/ui/card";

const actionsMap = {
  logout: {
    icon: LogOut,
    type: "Logout",
    label: "Logout",
    message: "Are you sure you want to logout?",
    color: "bg-accent-light-blue border-accent-light-blue",
  },
  delete: {
    icon: Trash2,
    type: "Delete",
    label: "Delete Account",
    message:
      "Are you sure you want to delete your account? This action cannot be undone.",
    color: "bg-accent-red border-accent-red",
  },
};

interface ConfirmActionButtonProps {
  action: "logout" | "delete";
  actionHandler: () => void;
}

export function ConfirmActionButton({
  action,
  actionHandler,
}: ConfirmActionButtonProps) {
  const [showConfirmAction, setShowConfirmAction] = useState(false);
  const toggleShowConfirmAction = () => setShowConfirmAction((prev) => !prev);

  const { icon: Icon, type, label, message, color } = actionsMap[action];

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Action Button */}
      <Button
        variant="default"
        className={`${color.split(" ")[0]} text-black flex items-center gap-2 py-4`}
        onClick={toggleShowConfirmAction}
      >
        <Icon size={18} />
        {label}
      </Button>

      {/* Confirmation Card */}
      {showConfirmAction && (
        <Card className="border rounded-xl p-4 space-y-3 border-border w-full">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">{`Confirm ${type}`}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-text-primary text-sm">{message}</p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={toggleShowConfirmAction}
                className="border-border text-text-secondary"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                className={`${color.split(" ")[0]} text-black`}
                onClick={() => {
                  actionHandler();
                  toggleShowConfirmAction();
                }}
              >
                Confirm {type}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}