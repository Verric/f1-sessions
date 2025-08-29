/**
 *
 * @param date Date object
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
