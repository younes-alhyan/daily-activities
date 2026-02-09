export const activityTypes = [
  "watching",
  "gaming",
  "coding",
  "reading",
] as const;

export type ActivityType = (typeof activityTypes)[number];

export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  state: boolean;
}
export interface Day {
  id: string;
  activities: [
    Activity,
    Activity,
    Activity,
    Activity,
    Activity,
    Activity,
    Activity,
  ];
}
