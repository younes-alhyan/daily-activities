type Route<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K];
};

type RoutesMap = {
  auth: { signup: unknown; login: unknown; refresh: unknown };
  user: { get: unknown; update: unknown; delete: unknown };
  days: { get: unknown; day: { add: unknown; delete: unknown } };
  activities: {
    add: unknown;
    activity: { update: unknown; delete: unknown; reorder: unknown };
  };
};

export type Routes<T extends RoutesMap> = Route<T>;
