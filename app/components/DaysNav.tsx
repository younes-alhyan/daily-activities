import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";

interface DaysNavProps {
  currentDayIndex: number;
  setCurrentDayIndex: (index: number) => void;
  daysCount: number;
  onAddDay: () => void;
  onDeleteDay: () => void;
}
export default function DaysNav({
  currentDayIndex,
  setCurrentDayIndex,
  daysCount,
  onAddDay,
  onDeleteDay,
}: DaysNavProps) {
  return (
    <div className="w-full flex justify-between items-center mb-6">
      {/* Days Navigation */}
      <div className="flex items-center gap-4">
        {currentDayIndex > 0 ? (
          <button
            onClick={() => setCurrentDayIndex(currentDayIndex - 1)}
            className="p-2 rounded-sm hover:bg-bg-card transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-text-muted" />
          </button>
        ) : (
          <div className="w-9" />
        )}
        <h1 className="text-xl font-medium">Day {currentDayIndex + 1}</h1>
        {currentDayIndex < daysCount - 1 && (
          <button
            onClick={() => setCurrentDayIndex(currentDayIndex + 1)}
            className="p-2 rounded-sm hover:bg-bg-card transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-text-muted" />
          </button>
        )}
      </div>
      {/* Day utilities */}
      <div className="flex items-center gap-4">
        <button
          onClick={onAddDay}
          className="p-2 rounded-sm hover:bg-bg-card transition-colors cursor-pointer group"
        >
          <Plus className="w-5 h-5 text-text-muted group-hover:text-accent-blue" />
        </button>
        <button
          onClick={onDeleteDay}
          className="p-2 rounded-sm hover:bg-bg-card transition-colors cursor-pointer group"
        >
          <Trash2 className="w-5 h-5 text-text-muted group-hover:text-accent-red" />
        </button>
      </div>
    </div>
  );
}
