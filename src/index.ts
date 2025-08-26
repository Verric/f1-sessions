import mri from "mri";
import { readRaceDataOrThrow, readSessionData } from "./dataFilefs.js";
import { getCurrentWeekend, getFollowingWeekend, getNextSession, getCurrentSession } from "./dataHelpers.js";
import { showCountDown, showHelp, showRaceResults, showWeekend } from "./presenters.js";
import { TRACK_NAMES } from "./constants.js";

async function main() {
  const args = mri(process.argv.slice(2), { alias: { h: "help" } });
  if (args.h) {
    showHelp();
    return;
  }
  const now = new Date();
  const sessionData = await readSessionData();
  const session = getCurrentSession(sessionData, now) || getNextSession(sessionData, now);
  const weekend = getCurrentWeekend(sessionData, now) || getFollowingWeekend(sessionData, now);

  showCountDown(session, weekend, now);

  if (args.l) {
    const tracks = Object.values(TRACK_NAMES).reduce(
      (total, trackName, index) => `${total} ${index + 1}: ${trackName} \n`,
      "",
    );
    console.log("Tracks Listing");
    console.log(tracks);
    return;
  }

  if (args.s) {
    showWeekend(weekend);
  }

  if (args.r) {
    const raceData = readRaceDataOrThrow();
    const raceIndex = Number(args.r);
    if (raceIndex < 1 || raceIndex > 24) {
      console.log("Please enter a race a number between 1-24");
      return;
    }
    showRaceResults(raceData, raceIndex - 1);
  }
}

main().catch(console.error);
