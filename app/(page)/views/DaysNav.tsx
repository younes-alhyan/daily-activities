import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/client/components/ui/button";
import type { SetStateAction } from "react";

interface DaysNavProps {
  daysCount: number;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<SetStateAction<number>>;
}

export function DaysNav({
  daysCount,
  selectedIndex,
  setSelectedIndex,
}: DaysNavProps) {
  const onSelectNext = () => {
    setSelectedIndex((prev) => Math.min(prev + 1, daysCount - 1));
  };

  const onSelectPrevious = () => {
    setSelectedIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={onSelectPrevious}
        className={selectedIndex === 0 ? "invisible" : ""}
      >
        <ChevronLeft className="h-5 w-5 text-muted-foreground" />
      </Button>

      <h1 className="text-xl font-medium">Day {selectedIndex + 1}</h1>

      <Button
        variant="ghost"
        size="icon"
        onClick={onSelectNext}
        className={selectedIndex === daysCount - 1 ? "invisible" : ""}
      >
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </Button>
    </div>
  );
}
