import { formatInTimeZone } from "date-fns-tz";
import mri from "mri";
import pc from "picocolors";
import { HOST_TZ, TIME_FORMAT, TIME_ZONES, TRACK_NAMES } from "./constants.js";
import { getDataFromFile } from "./dataFilefs.js";
import {
  getCountDown,
  getCurrentWeekend,
  getFollowingWeekend,
  getNextSession,
} from "./dataHelpers.js";
import type { CountDownData, RaceResultsType, Weekend } from "./types.js";

import { readFileSync } from "node:fs";

async function main() {
  const args = mri(process.argv.slice(2), {
    alias: { h: "help" },
  }); // this may need to change if packaged as single exe

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

  if (args.h) {
    console.log("Usage: node f1-sessions <options>");
    console.log(
      "-s    Displays all sessions for the current or following race weekend",
    );
    return;
  }

  if (args.s) {
    printWeekend(weekend);
  }

  if (args.t) {
    const raceData: RaceResultsType = JSON.parse(
      readFileSync("./race.json", {
        encoding: "utf-8",
      }),
    );
    const race = raceData[Number(args.t)];
    console.log();
    console.log("Race Results:", pc.greenBright(race!.location));
    console.log(
      pc.gray(
        "Pos".padEnd(5) +
          "No.".padEnd(5) +
          "Driver".padEnd(20) +
          "Team".padEnd(20) +
          "Laps".padEnd(5) +
          "Time".padEnd(20) +
          "Points".padEnd(5),
      ),
    );
    console.log(pc.gray("-".repeat(80))); // separator line after header
    race!.results.forEach((result, idx) => {
      const colour = idx % 2 === 0 ? pc.blue : pc.white;
      const position = colour(result.position.toString().padEnd(5));
      const number = colour(result.number.toString().padEnd(5));
      const driver = colour(result.driver.padEnd(20));
      const team = colour(result.team.padEnd(20));
      const laps = colour(result.laps.toString().padEnd(5));
      const time = colour(result.time.padEnd(20));
      const points = colour(result.points.toString().padEnd(5));
      console.log(position + number + driver + team + laps + time + points);
    });
  }
}

function printWeekend(weekend: Weekend) {
  console.log(
    pc.gray("Session Name".padEnd(20)) +
      pc.gray("Local Time".padEnd(20)) +
      pc.gray("Track Time"),
  );
  console.log(pc.gray("-".repeat(80)));
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
