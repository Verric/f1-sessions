import { performance } from "node:perf_hooks";
import mri from "mri";
import { getConstructorLeaderboard, getDriversLeaderboard } from "./championshipDataHelper.js";
import { TRACK_NAMES } from "./constants.js";
import { readRaceDataOrThrow, readSessionDataOrThrow } from "./dataFilefs.js";
import { getCurrentSession, getCurrentWeekend, getFollowingWeekend, getNextSession } from "./dataHelpers.js";
import {
  showConstrutorLeaderboard,
  showCountDown,
  showDriversLeaderboard,
  showHelp,
  showRaceResults,
  showWeekend,
} from "./presenters.js";

function main() {
  const args = mri(process.argv.slice(2), { alias: { h: "help" } });
  console.log(args);
  if (args.h) {
    showHelp();
    return;
  }
  const now = new Date();
  const sessionData = readSessionDataOrThrow();
  const raceData = readRaceDataOrThrow();
  const session = getCurrentSession(sessionData, now) || getNextSession(sessionData, now);
  const weekend = getCurrentWeekend(sessionData, now) || getFollowingWeekend(sessionData, now);

  showCountDown(session, weekend, now);

  if (args.l) {
    const tracks = Object.values(TRACK_NAMES).reduce(
      (total, trackName, index) => `${total} ${index + 1}: ${trackName} \n`,
      "",
    );

    process.stdout.write(`Track Listings\n${tracks}`);

    return;
  }

  if (args.s) {
    showWeekend(weekend);
  }

  if (args.c) {
    const start = performance.now();
    const race = typeof args.c === "number" ? args.c : raceData.length;
    if (args.c < 1 || args.c > raceData.length) {
      console.log(`Please enter a race a number between 1-${raceData.length}`);
      return;
    }
    const results = getConstructorLeaderboard(raceData.slice(0, race));
    showConstrutorLeaderboard(results);
    const end = performance.now();
    console.log("time", end - start);
  }

  if (args.d) {
    const race = typeof args.d === "number" ? args.d : raceData.length;
    if (args.d < 1 || args.d > raceData.length) {
      console.log(`Please enter a race a number between 1-${raceData.length}`);
      return;
    }
    const results = getDriversLeaderboard(raceData.slice(0, race));
    showDriversLeaderboard(results);
  }

  if (args.r) {
    const raceIndex = Number(args.r);
    if (raceIndex < 1 || raceIndex > raceData.length) {
      console.log(`Please enter a race a number between 1-${raceData.length}`);
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
