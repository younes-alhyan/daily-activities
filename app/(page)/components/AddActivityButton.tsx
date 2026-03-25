import { Plus } from "lucide-react";
import { useActivities } from "@/app/(page)/contexts/ActivitiesContext";
import { Button } from "@/client/components/ui/button";

export function AddActivityButton() {
  const { addActivity } = useActivities();
  return (
    <Button
      variant="outline"
      className="w-full py-4"
      onClick={() =>
        addActivity.call({
          body: { type: "watching", state: false, description: "" },
        })
      }
      disabled={addActivity.isLoading}
    >
      <Plus />
      Add Activity
    </Button>
  );
}
