import { MONTH_MAP } from "./constants.js";
export function timeToUTCstring(
  month: keyof typeof MONTH_MAP,
  day: string,
  hours: string,
  minutes: string,
): string {
  if (!day || !month || !hours || !minutes) return "";

  const date = new Date();
  date.setUTCMonth(MONTH_MAP[month]!, Number(day));
  date.setUTCHours(Number(hours), Number(minutes), 0, 0);
  return date.toISOString();
}
