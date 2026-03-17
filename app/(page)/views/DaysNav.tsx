import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/client/components/button";

interface DaysNavProps {
  daysCount: number;
  selectedIndex: number;
  onSelectNext: () => void;
  onSelectPrevious: () => void;
}

export function DaysNav({
  daysCount,
  selectedIndex,
  onSelectNext,
  onSelectPrevious,
}: DaysNavProps) {
  return (
    <div className="flex items-center gap-4">
      {selectedIndex > 0 ? (
        <Button variant="ghost" size="icon" onClick={onSelectPrevious}>
          <ChevronLeft className="h-5 w-5 text-muted-foreground" />
        </Button>
      ) : (
        <div className="w-9" />
      )}

      <h1 className="text-xl font-medium">Day {selectedIndex + 1}</h1>

      {selectedIndex < daysCount - 1 && (
        <Button variant="ghost" size="icon" onClick={onSelectNext}>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}
