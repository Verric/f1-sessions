import { MONTH_MAP } from "../constants/general.js";

/**
 *
 * @param dateString Date string
 * @param tz String IANA tz string
 * @returns string of the formatted tz
 *
 * Current string format is "MMM d h:mm a" -> Aug 29 8:30 PM
 */
export function formatTimeTz(dateString: string, tz: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(new Date(dateString))
    .replace(",", "");
}

export function timeToUTCstring(month: keyof typeof MONTH_MAP, day: string, hours: string, minutes: string): string {
  if (!day || !month || !hours || !minutes) return "";

  const date = new Date();
  date.setUTCMonth(MONTH_MAP[month], Number(day));
  date.setUTCHours(Number(hours), Number(minutes), 0, 0);
  return date.toISOString();
}
