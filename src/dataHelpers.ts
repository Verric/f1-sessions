import type { CountDownData, F1Session, Schedule, Weekend } from "./types.js";
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
 * This function works on the assumption that data in schedule.json is stored chronologically.
 */
export function getNextSession(data: Schedule, now: Date): F1Session | null {
  for (const weekend of data) {
    for (const session of weekend.sessions) {
      if (new Date(session.start) > now) return session;
    }
  }
  return null;
}

export function getCountDown(nextSessionTime: string, now: Date): CountDownData {
  const sessionTime = new Date(nextSessionTime).getTime();
  const currentTime = now.getTime();
  const deltaSeconds = Math.floor((sessionTime - currentTime) / 1000);

  const days = Math.floor(deltaSeconds / 86400);
  const hours = Math.floor((deltaSeconds % 86400) / 3600);
  const minutes = Math.floor((deltaSeconds % 3600) / 60);
  return { days, hours, minutes };
}

/**
 * Didn't know what to call this function,
 * Just returns the start and end session but handles RACE sessions as well.
 * Currently the F1 RACE sessions do not have an end time, so we arbitrarily set a 2 hour window
 */
function sessionBounds(s: F1Session): [number, number] {
  const TWO_HOURS = 2 * 60 * 60 * 1000;
  const start = new Date(s.start).getTime();
  const end = s.name === "Race" ? start + TWO_HOURS : new Date(s.end).getTime();
  return [start, end];
}

export function getCurrentSession(data: Schedule, now: Date): F1Session | null {
  const currentTime = now.getTime();
  for (const weekend of data) {
    for (const session of weekend.sessions) {
      const [start, end] = sessionBounds(session);
      if (currentTime >= start && currentTime < end) return session;
    }
  }
  return null;
}

export function isInSession(data: Schedule, now: Date): boolean {
  return !!getCurrentSession(data, now);
}
