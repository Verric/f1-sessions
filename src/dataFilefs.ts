import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { RaceResultsType, Schedule } from "./types.js";

const SESSION_DATA_FILE = "schedule.json";
const RACE_DATA_FILE = "race.json";

const SESSION_DATA = fileURLToPath(import.meta.resolve(join("..", "data", SESSION_DATA_FILE)));
const RACE_DATA = fileURLToPath(import.meta.resolve(join("..", "data", RACE_DATA_FILE)));

export function readSessionDataOrThrow() {
  const data = readFileSync(SESSION_DATA, { encoding: "utf-8" });
  return JSON.parse(data) as Schedule;
}

export function readRaceDataOrThrow() {
  const data = readFileSync(RACE_DATA, { encoding: "utf-8" });
  return JSON.parse(data) as RaceResultsType;
}

export function save(data: Schedule) {
  writeFileSync(SESSION_DATA, JSON.stringify(data), {
    encoding: "utf-8",
    flag: "a",
  });
}
