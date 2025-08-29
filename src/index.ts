import mri from "mri";
import { getConstructorLeaderboard, getDriversLeaderboard } from "./championshipDataHelper.js";
import { TRACK_NAMES } from "./constants.js";
import { readRaceDataOrThrow, readSessionDataOrThrow } from "./dataFilefs.js";
import { getCurrentSession, getCurrentWeekend, getFollowingWeekend, getNextSession } from "./dataHelpers.js";
import {
  showBanner,
  showConstrutorLeaderboard,
  showCountDown,
  showCurrentSession,
  showDriversLeaderboard,
  showHelp,
  showRaceResults,
  showWeekend,
} from "./presenters.js";
import { performance } from "node:perf_hooks";

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

  if (args.q) {
    const start = performance.now();
    getFollowingWeekend(sessionData, now);
    const end = performance.now();
    console.log("normal:", end - start);
    const start1 = performance.now();
    getFollowingWeekend(sessionData, now);
    const end1 = performance.now();
    console.log("normal:", end1 - start1);
    const start2 = performance.now();
    getFollowingWeekend(sessionData, now);
    const end2 = performance.now();
    console.log("normal:", end2 - start2);

    const start3 = performance.now();

    const end3 = performance.now();
    console.log("string:", end3 - start3);

    const start4 = performance.now();

    const end4 = performance.now();
    console.log("string", end4 - start4);

    const start5 = performance.now();

    const end5 = performance.now();
    console.log("string", end5 - start5);
  }

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
      process.stdout.write(`Please enter a race a number between 1-${raceData.length}\n`);
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
      process.stdout.write(`Please enter a race a number between 1-${raceData.length}\n`);
      return;
    }
    const results = getDriversLeaderboard(raceData.slice(0, race));
    showDriversLeaderboard(results);
  }

  if (args.r) {
    const raceIndex = Number(args.r);
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
