import mri from "mri";
import { getCurrentSession, getCurrentWeekend, getFollowingWeekend, getNextSession } from "./dataProcessors.js";
import {
  handleConstructorChampionship,
  handleDriversChampionship,
  handleRaceListings,
  handleRaceResults,
  handleScheduleWeekend,
  handleUpdateRaces,
} from "./handlers.js";
import { showBanner, showCountDown, showCurrentSession, showHelp } from "./presenters.js";
import { readRaceDataOrThrow, readSessionDataOrThrow } from "./utils/filesystem.js";

async function main() {
  const args = mri(process.argv.slice(2), { alias: { h: "help" } });

  if (args.h) {
    showHelp();
    return;
  }

  const now = new Date();

  const sessionData = readSessionDataOrThrow();
  const raceData = readRaceDataOrThrow();
  const currentSession = getCurrentSession(sessionData, now);
  const session = getNextSession(sessionData, now);
  const weekend = getCurrentWeekend(sessionData, now) || getFollowingWeekend(sessionData, now);

  showBanner();
  showCurrentSession(currentSession);
  showCountDown(session, weekend, now);

  if (args.l) {
    handleRaceListings(sessionData, now);
    return;
  }

  if (args.s) {
    handleScheduleWeekend(sessionData, now);
  }

  if (args.c) {
    handleConstructorChampionship(raceData, args.c);
  }

  if (args.d) {
    handleDriversChampionship(raceData, args.d);
  }

  if (args.r) {
    handleRaceResults(raceData, args.r);
  }

  if (args.u) {
    process.stdout.write("Updating race results. This will scrape the F1 website\n");
    await handleUpdateRaces(sessionData, now);
    process.stdout.write("Race results updated\n");
  }
}

try {
  await main();
} catch (error) {
  console.error(error);
}
