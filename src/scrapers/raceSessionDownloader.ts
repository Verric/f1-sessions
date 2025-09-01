import { writeFile } from "node:fs/promises";
import { BASE_URL_RACE, raceURIs } from "../constants/api.js";
import { scrapeRaces } from "./races.js";

const file = "./race.json";
export async function downloadRaces() {
  const result = [];
  for (const race of raceURIs) {
    const url = `${BASE_URL_RACE}${race}`;
    console.log("Fetching race data:", url);
    const raceResults = await scrapeRaces(url);
    console.log({ location: race.split("/")[1], results: raceResults });
    result.push({ location: race.split("/")[1], results: raceResults });
  }
  await writeFile(file, JSON.stringify(result, null, 2));
}
