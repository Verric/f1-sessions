import mri from "mri";
import { getConstructorLeaderboard, getDriversLeaderboard } from "./championshipDataHelper.js";

import { readRaceDataOrThrow, readSessionDataOrThrow } from "./dataFilefs.js";
import { getCurrentSession, getCurrentWeekend, getFollowingWeekend, getNextSession } from "./dataHelpers.js";
import {
  showBanner,
  showConstrutorLeaderboard,
  showCountDown,
  showCurrentSession,
  showDriversLeaderboard,
  showHelp,
  showRaceListings,
  showRaceResults,
  showWeekend,
} from "./presenters.js";

function main() {
  const args = mri(process.argv.slice(2), { alias: { h: "help" } });
  if (args.h) {
    showHelp();
    return;
  }
  const now = new Date();

  const sessionData = readSessionDataOrThrow();
  const raceData = readRaceDataOrThrow();
  const session = getNextSession(sessionData, now);
  const weekend = getCurrentWeekend(sessionData, now) || getFollowingWeekend(sessionData, now);
  const currentSession = getCurrentSession(sessionData, now);

  showBanner();
  showCurrentSession(currentSession);
  showCountDown(session, weekend, now);

  if (args.l) {
    showRaceListings(sessionData, now);
    return;
  }

  if (args.s) {
    showWeekend(weekend);
  }

  if (args.c) {
    const race = typeof args.c === "number" ? args.c : raceData.length;
    if (args.c < 1 || args.c > raceData.length) {
      process.stdout.write(`Please enter a race a number between 1-${raceData.length}\n`);
      return;
    }
    const results = getConstructorLeaderboard(raceData.slice(0, race));
    showConstrutorLeaderboard(results);
  }

  if (args.d) {
    const race = typeof args.d === "number" ? args.d : raceData.length;
    if (args.d < 1 || args.d > raceData.length) {
      process.stdout.write(`Please enter a race a number between 1-${raceData.length}\n`);
      return;
    }
    const results = getDriversLeaderboard(raceData.slice(0, race));
    showDriversLeaderboard(results);
  }

  //if users doesn't specify any race eg. "f1-sessions -r" return the latest race results
  if (args.r) {
    const raceIndex = args.r === true ? raceData.length : Number(args.r);
    if (raceIndex < 1 || raceIndex > raceData.length) {
      process.stdout.write(`Please enter a race a number between 1-${raceData.length}\n`);
      return;
    }
    showRaceResults(raceData, raceIndex - 1);
  }
}

try {
  main();
} catch (error) {
  console.error(error);
}
