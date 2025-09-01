import { BASE_URL_RACE, raceURIs } from "./constants/api.js";
import {
  getConstructorLeaderboard,
  getCurrentWeekend,
  getDriversLeaderboard,
  getFollowingWeekend,
} from "./dataProcessors.js";
import {
  showConstrutorLeaderboard,
  showDriversLeaderboard,
  showRaceListings,
  showRaceResults,
  showWeekend,
} from "./presenters.js";
import { scrapeRaces } from "./scrapers/races.js";
import type { RaceResults, Schedule } from "./types.js";
import { saveRaces } from "./utils/filesystem.js";

// CONSTRUCTORS CHAMPIONSHIP
export function handleConstructorChampionship(raceData: RaceResults, raceNumber?: number | boolean) {
  const race = typeof raceNumber === "number" ? raceNumber : raceData.length;
  if (raceNumber && (race < 1 || race > raceData.length)) {
    process.stdout.write(`Please enter a race a number between 1-${raceData.length}\n`);
    return;
  }
  const results = getConstructorLeaderboard(raceData.slice(0, race));
  showConstrutorLeaderboard(results);
}

// DRIVERS CHAMPIONSHIP
export function handleDriversChampionship(raceData: RaceResults, raceNumber?: number | boolean) {
  const race = typeof raceNumber === "number" ? raceNumber : raceData.length;
  if (raceNumber && (race < 1 || race > raceData.length)) {
    process.stdout.write(`Please enter a race a number between 1-${raceData.length}\n`);
    return;
  }
  const results = getDriversLeaderboard(raceData.slice(0, race));
  showDriversLeaderboard(results);
}

// RACE HANDLERS
export function handleRaceResults(raceData: RaceResults, raceIndex?: number | boolean) {
  //if users doesn't specify any race eg. "f1-sessions -r" return the latest race results
  const raceNumber = raceIndex === true ? raceData.length : Number(raceIndex);
  if (raceNumber < 1 || raceNumber > raceData.length) {
    process.stdout.write(`Please enter a race a number between 1-${raceData.length}\n`);
    return;
  }
  showRaceResults(raceData, raceNumber - 1);
}

export async function handleUpdateRaces() {
  //const races: RaceResults = [];
  const racePromises = raceURIs.map(async (race) => {
    const foo = race.split("/");
    const location = foo[2] === "sprint-results" ? `${foo[1]} - sprint` : foo[1];
    const data = await scrapeRaces(`${BASE_URL_RACE}${race}`);
    return { location, results: data };
  });

  //@ts-expect-error silence TS about possibly undefined
  const races: RaceResults = await Promise.all(racePromises);
  saveRaces(races);
}

// SESSION HANDLERS
export function handleScheduleWeekend(sessionData: Schedule, now: Date) {
  const weekend = getCurrentWeekend(sessionData, now) || getFollowingWeekend(sessionData, now);
  showWeekend(weekend);
}

// MISC HANDLERS
export function handleRaceListings(sessionData: Schedule, now: Date) {
  showRaceListings(sessionData, now);
}
