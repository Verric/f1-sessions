import type { CountDownData, F1Session, Schedule, Weekend } from "./types.js";
/**
 * WARNING
 * Pretty much ever function in this file works on the assumption that data is stored chronologically.
 * from race#start time
 */

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
  return null;
}

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
 * Currently the scraped F1 RACE sessions do not have an end time, so we arbitrarily set a 1.5 hour window
 */
function sessionBounds(s: F1Session): [number, number] {
  const NINETY_MINUTES = 90 * 60 * 1000;
  const start = new Date(s.start).getTime();
  const end = s.name === "Race" ? start + NINETY_MINUTES : new Date(s.end).getTime();
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

// un-used function. I asked claude to take the above iter approach and make it a binary search
// then did some basic perf testing using performance#now
// iter 0.05033399999999233
// iter 0.042833000000001675
// iter 0.043541000000004715
// binary 0.034166999999996506
// binary 0.006042000000007874
// binary 0.006249999999994316
// as you can see both sort of have a cold start and then pick up the pace. The V8 seems to love the binary search
// rendition once it's got a hotpath going, pretty much 4x faster over iter at (max) 24 elemnts
// biome-ignore lint/correctness/noUnusedVariables: 4 teh lulz
function getCurrentSessionBinary(data: Schedule, now: Date): F1Session | null {
  const allSessions = data.flatMap((weekend) => weekend.sessions);
  const currentTime = now.getTime();
  let low = 0;
  let high = allSessions.length - 1;
  let candidateIndex = -1;

  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    const sessionStartTime = sessionBounds(allSessions[mid]!)[0];

    if (sessionStartTime <= currentTime) {
      candidateIndex = mid; // This is a potential candidate
      low = mid + 1; // Try to find a later one
    } else {
      high = mid - 1;
    }
  }

  // Verify the candidate session
  if (candidateIndex > -1) {
    const session = allSessions[candidateIndex]!;
    const [start, end] = sessionBounds(session);
    if (currentTime >= start && currentTime < end) {
      return session;
    }
  }
  return null;
}
