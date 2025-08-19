//import { describe, expect, test } from "vitest";
import type { Schedule } from "../src/types.js";

const _testData: Schedule = [
  {
    location: "australia",
    sessions: [
      {
        name: "Practice 1",
        start: "2025-03-14T01:30:00.000Z",
        end: "2025-03-14T02:30:00.000Z",
      },
      {
        name: "Race",
        start: "2025-03-16T04:00:00.000Z",
        end: "",
      },
    ],
  },
  {
    location: "china",
    sessions: [
      {
        name: "Practice 1",
        start: "2025-03-21T03:30:00.000Z",
        end: "2025-03-21T04:30:00.000Z",
      },
      {
        name: "Race",
        start: "2025-03-23T07:00:00.000Z",
        end: "",
      },
    ],
  },
];
