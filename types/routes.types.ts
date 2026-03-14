type Route<T extends Record<string, any>> = {
  [K in keyof T]: T[K];
};

type RoutesMap = {
  auth: { signup: any; login: any; refresh: any };
  user: { get: any; update: any; delete: any };
  days: { get: any; day: { add: any; delete: any } };
  activities: {
    add: any;
    activity: { update: any; delete: any; reorder: any };
  };
};

export type Routes<T extends RoutesMap> = Route<T>;
