import { Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/client/components/button";

interface ActivityActionsProps {
  isEditing: boolean;
  toggleEditing: () => void;
  discardChanges: () => void;
  updateActivityHandler: () => void;
  deleteActivcityHandler: () => void;
}

export function ActivityActions({
  isEditing,
  toggleEditing,
  discardChanges,
  updateActivityHandler,
  deleteActivcityHandler,
}: ActivityActionsProps) {
  if (isEditing)
    return (
      <>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            updateActivityHandler();
            toggleEditing();
          }}
        >
          <Check className="w-5 h-5 text-accent-green" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            discardChanges();
            toggleEditing();
          }}
        >
          <X className="w-5 h-5" />
        </Button>
      </>
    );

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
