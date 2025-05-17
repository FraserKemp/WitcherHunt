export const StatKeys = {
  kills: "kills",
  captures: "captures",
  huntsCompleted: "huntsCompleted",
  totalHunts: "totalHunts",
};

export type StatKey = keyof typeof StatKeys;
