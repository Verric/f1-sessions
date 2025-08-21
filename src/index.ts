import { formatInTimeZone } from "date-fns-tz";
import pc from "picocolors";
import { HOST_TZ, TIME_ZONES, TRACK_NAMES } from "./constants.js";
import { readOrThrow } from "./dataFilefs.js";
import {
  getCountDown,
  getCurrentWeekend,
  getFollowingWeekend,
  getNextSession,
} from "./dataHelpers.js";
import type { CountDownData } from "./types.js";

async function main() {
  const now = new Date();
  const fileData = await readOrThrow();
  const data = JSON.parse(fileData);
  const session = getNextSession(data, now);
  const weekend =
    getCurrentWeekend(data, now) || getFollowingWeekend(data, now);
  if (!weekend) return null;
  if (!session) return "";
  const countdown = getCountDown(session.start, now);
  console.log(`🏎️ ${pc.red("F1 Sessions")}`);
  console.log(
    pc.greenBright(pc.bold(`${TRACK_NAMES[weekend.location]}`)),
    "/",
    pc.greenBright(session.name),
    "/",
    pc.greenBright(formatCountDown(countdown)),
  );
  console.log(
    pc.gray("Session Name".padEnd(20)) +
      pc.gray("Local Time".padEnd(20)) +
      pc.gray("Track Time"),
  );

  weekend.sessions.forEach((session, idx) => {
    const colour = idx % 2 === 0 ? pc.blue : pc.white;

    const sessionName = colour(`${session.name}:`.padEnd(20));
    const localTime = colour(
      formatInTimeZone(session.start, HOST_TZ, "MMM d h:mm a").padEnd(20),
    );
    const trackTime = colour(
      formatInTimeZone(
        session.start,
        TIME_ZONES[weekend.location],
        "MMM d h:mm a",
      ),
    );

    console.log(sessionName + localTime + trackTime);
  });
}

function formatCountDown(data: CountDownData) {
  return `${data.days}d ${data.hours}h ${data.minutes}m`;
}

main().catch(console.error);
