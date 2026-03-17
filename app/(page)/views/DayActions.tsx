"use client";
import { useRouter } from "next/navigation";
import { Plus, Trash2, User } from "lucide-react";
import { Button } from "@/client/components/button";

interface DayActionsProps {
  addDay: () => void;
  deleteDay: () => void;
  isAdding: boolean;
  isDeleting: boolean;
}

export function DayActions({
  addDay,
  deleteDay,
  isAdding,
  isDeleting,
}: DayActionsProps) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="group"
        onClick={addDay}
        disabled={isAdding}
      >
        <Plus className="text-muted-foreground group-hover:text-accent-blue" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="group"
        onClick={deleteDay}
        disabled={isDeleting}
      >
        <Trash2 className="text-muted-foreground group-hover:text-accent-red" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="group"
        onClick={() => router.push("/user")}
      >
        <User className="text-muted-foreground group-hover:text-accent-light-blue" />
      </Button>
    </div>
  );
}
