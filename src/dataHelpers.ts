import { differenceInSeconds } from "date-fns";
import type { F1Session, Schedule, Weekend } from "./types.js";
export function getCurrentWeekend(data: Schedule, now: Date): Weekend | null {
  return (
    data.find((weekend) => {
      if (!weekend?.sessions?.length) return false;
      const first = new Date(weekend.sessions[0]!.start);
      const last = new Date(weekend.sessions.at(-1)!.start);
      return now > first && now < last;
    }) ?? null
  );
}

export function getFollowingWeekend(data: Schedule, now: Date): Weekend | null {
  for (const weekend of data) {
    if (new Date(weekend.sessions[0]!.start) > now) return weekend;
  }
  return null; // No future sessions
}

/**
 * This function works on the assumption that data in data.json is stored chronologically.
 */
export function getNextSession(data: Schedule, now: Date): F1Session | null {
  for (const weekend of data) {
    for (const s of weekend.sessions) {
      if (new Date(s.start) > now) return s;
    }
  }
  return null;
}

export function getCountDown(nextSessionTime: string) {
  const now = new Date();
  const deltaSeconds = differenceInSeconds(new Date(nextSessionTime), now);
  const days = Math.floor(deltaSeconds / 86400);
  const hours = Math.floor((deltaSeconds % 86400) / 3600);
  const mins = Math.floor((deltaSeconds % 3600) / 60);
  return `${days}d ${hours}h ${mins}m`;
}
