import { readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import type { RaceResultsType, Schedule } from "./types.js";

const SESSION_DATA_FILE = "schedule.json" as const;
const RACE_DATA_FILE = "race.json";

export function readSessionData() {
  try {
    const data = readFileSync(SESSION_DATA_FILE, { encoding: "utf-8", flag: "r" });
    const sessionData = JSON.parse(data);
    return sessionData;
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.log("Error reading session data file", message);
  }
}

export function readRaceDataOrThrow() {
  try {
    const data = readFileSync(RACE_DATA_FILE, { encoding: "utf-8", flag: "r" });
    const raceData: RaceResultsType = JSON.parse(data);
    return raceData;
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    throw new Error(`Error reading race data file: ${message}`);
  }
}

// export async function parseOrThrow(): Promise<Schedule> {
//   const fileData = await readOrThrow();
//   let result: Schedule = [];
//   try {
//     result = ScheduleSchema.parse(JSON.parse(fileData));
//   } catch (error) {
//     if (error instanceof ZodError) {
//       console.error("Problems validating file data file: ", JSON.stringify(error.issues, null, 2));
//     }
//   }
//   return result;
// }

export async function save(data: Schedule) {
  await writeFile(SESSION_DATA_FILE, JSON.stringify(data), {
    encoding: "utf8",
    flag: "a",
  });
}
