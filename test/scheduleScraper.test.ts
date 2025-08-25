import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { scrapeSessions } from "../src/scrapers/scheduleScraper.js";
import type { F1Session } from "../src/types.js";

describe("foo", async () => {
  const html = readFileSync("test/fixtures/schedule.html", "utf-8");
  it("should get the correct result", async () => {
    const result = scrapeSessions(html);
    const expected: F1Session[] = [
      {
        name: "Practice 1",
        start: "2025-05-23T11:30:00.000Z",
        end: "2025-05-23T12:30:00.000Z",
      },
      {
        name: "Practice 2",
        start: "2025-05-23T15:00:00.000Z",
        end: "2025-05-23T16:00:00.000Z",
      },
      {
        name: "Practice 3",
        start: "2025-05-24T10:30:00.000Z",
        end: "2025-05-24T11:30:00.000Z",
      },
      {
        name: "Qualifying",
        start: "2025-05-24T14:00:00.000Z",
        end: "2025-05-24T15:00:00.000Z",
      },
      {
        name: "Race",
        start: "2025-05-25T13:00:00.000Z",
        end: "",
      },
    ];
    expect(result).toEqual(expected);
  });
});
