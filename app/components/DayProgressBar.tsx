interface DayProgressBarProps {
  progress: number;
}
export default function DayProgressBar({ progress }: DayProgressBarProps) {
  return (
    <div className="w-full flex flex-col my-4 px-2">
      <div className="w-full flex items-center justify-between">
        <span className="text-sm text-text-muted">Day Progress</span>
        <span className="text-sm text-text-muted">{progress}/7</span>
      </div>
      <div className="w-full h-2 bg-border rounded-full mt-2">
        <div
          className="h-full bg-accent-green rounded-full z-10 transition-[width] duration-300 ease-out"
          style={{ width: `${(progress / 7) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
