import { Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/client/components/ui/button";

interface ActivityActionsProps {
  isEditing: boolean;
  toggleEditing: () => void;
  onDiscardChanges: () => void;
  updateActivityHandler: () => void;
  deleteActivcityHandler: () => void;
}

export function ActivityActions({
  isEditing,
  toggleEditing,
  onDiscardChanges,
  updateActivityHandler,
  deleteActivcityHandler,
}: ActivityActionsProps) {
  if (isEditing) {
    return (
      <>
        <Button size="icon" variant="ghost" onClick={updateActivityHandler}>
          <Check className="w-5 h-5 text-accent-green" />
        </Button>
        <Button size="icon" variant="ghost" onClick={onDiscardChanges}>
          <X className="w-5 h-5" />
        </Button>
      </>
    );
  }

  return (
    <>
      <Button size="icon" variant="ghost" onClick={toggleEditing}>
        <Pencil className="w-5 h-5" />
      </Button>
      <Button size="icon" variant="ghost" onClick={deleteActivcityHandler}>
        <Trash2 className="w-5 h-5 text-red-500" />
      </Button>
    </>
  );
}
