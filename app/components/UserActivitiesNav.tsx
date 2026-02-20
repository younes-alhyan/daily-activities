import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";

interface UserActivitiesNavProps {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  userActivitiesCount: number;
  onAddActivities: () => void;
  onDeleteActivities: () => void;
}
export default function UserActivitiesNav({
  selectedIndex,
  setSelectedIndex,
  userActivitiesCount,
  onAddActivities,
  onDeleteActivities,
}: UserActivitiesNavProps) {
  return (
    <div className="w-full flex justify-between items-center mb-6">
      {/* Days Navigation */}
      <div className="flex items-center gap-4">
        {selectedIndex > 0 ? (
          <button
            onClick={() => setSelectedIndex(selectedIndex - 1)}
            className="p-2 rounded-sm hover:bg-bg-card transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-text-muted" />
          </button>
        ) : (
          <div className="w-9" />
        )}
        <h1 className="text-xl font-medium">Day {selectedIndex + 1}</h1>
        {selectedIndex < userActivitiesCount - 1 && (
          <button
            onClick={() => setSelectedIndex(selectedIndex + 1)}
            className="p-2 rounded-sm hover:bg-bg-card transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-text-muted" />
          </button>
        )}
      </div>
      {/* Day utilities */}
      <div className="flex items-center gap-4">
        <button
          onClick={onAddActivities}
          className="p-2 rounded-sm hover:bg-bg-card transition-colors cursor-pointer group"
        >
          <Plus className="w-5 h-5 text-text-muted group-hover:text-accent-blue" />
        </button>
        <button
          onClick={onDeleteActivities}
          className="p-2 rounded-sm hover:bg-bg-card transition-colors cursor-pointer group"
        >
          <Trash2 className="w-5 h-5 text-text-muted group-hover:text-accent-red" />
        </button>
      </div>
    </div>
  );
}
