import { formatInTimeZone } from "date-fns-tz";
import mri from "mri";
import pc from "picocolors";
import { HOST_TZ, TIME_ZONES, TRACK_NAMES, TIME_FORMAT } from "./constants.js";
import { getDataFromFile } from "./dataFilefs.js";
import {
  getCountDown,
  getCurrentWeekend,
  getFollowingWeekend,
  getNextSession,
} from "./dataHelpers.js";
import type { CountDownData, Weekend } from "./types.js";

async function main() {
  const args = mri(process.argv.slice(2), { alias: { s: "session" } }); // this may need to change if packaged as single exe
  console.log(args);
  const now = new Date();
  const data = await getDataFromFile();
  const session = getNextSession(data, now);
  const weekend =
    getCurrentWeekend(data, now) || getFollowingWeekend(data, now);

  if (!weekend || !session) {
    console.log("No Further Events");
    return;
  }

  const countdown = getCountDown(session.start, now);
  const trackName = pc.greenBright(pc.bold(`${TRACK_NAMES[weekend.location]}`));
  const sessionName = pc.greenBright(session.name);
  const countdownString = pc.greenBright(formatCountDown(countdown));

  console.log(`🏎️ ${pc.red("F1 Sessions")}`);
  console.log(`${trackName} / ${sessionName} / ${countdownString}`);

  if (args.s) {
    printWeekend(weekend);
  }
}

function printWeekend(weekend: Weekend) {
  console.log(
    pc.gray("Session Name".padEnd(20)) +
      pc.gray("Local Time".padEnd(20)) +
      pc.gray("Track Time"),
  );

  weekend.sessions.forEach((session, idx) => {
    const colour = idx % 2 === 0 ? pc.blue : pc.white;

    const sessionName = colour(`${session.name}:`.padEnd(20));
    const localTime = colour(
      formatInTimeZone(session.start, HOST_TZ, TIME_FORMAT).padEnd(20),
    );
    const trackTime = colour(
      formatInTimeZone(
        session.start,
        TIME_ZONES[weekend.location],
        TIME_FORMAT,
      ),
    );

    console.log(sessionName + localTime + trackTime);
  });
}

function formatCountDown(data: CountDownData) {
  return `${data.days}d ${data.hours}h ${data.minutes}m`;
}

main().catch(console.error);
