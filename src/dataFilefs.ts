import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { ZodError } from "zod";
import { type Schedule, ScheduleSchema } from "./types.js";

const DATA_FILE = "schedule.json" as const;

async function readOrThrow() {
  if (!existsSync(DATA_FILE)) throw new Error("data file missing"); // write gooder message
  return await readFile(DATA_FILE, "utf8");
}

export async function getDataFromFile(): Promise<Schedule> {
  const data = await readOrThrow();
  try {
    return JSON.parse(data);
  } catch (_err) {
    throw new Error(`Error Parsing ${DATA_FILE} please verify file `);
  }
}

export async function parseOrThrow(): Promise<Schedule> {
  const fileData = await readOrThrow();
  let result: Schedule = [];
  try {
    result = ScheduleSchema.parse(JSON.parse(fileData));
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(
        "Problems validating file data file: ",
        JSON.stringify(error.issues, null, 2),
      );
    }
  }
  return result;
}

export async function save(data: Schedule) {
  await writeFile(DATA_FILE, JSON.stringify(data), {
    encoding: "utf8",
    flag: "a",
  });
}
