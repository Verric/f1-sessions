import type { Schedule } from "../../src/types.js";

// Main test fixture - represents a typical F1 season schedule
export const testScheduleFixture: Schedule = [
  {
    location: "australia",
    sessions: [
      {
        name: "Practice 1",
        start: "2025-03-14T01:30:00.000Z",
        end: "2025-03-14T02:30:00.000Z",
      },
      {
        name: "Practice 2",
        start: "2025-03-14T05:00:00.000Z",
        end: "2025-03-14T06:00:00.000Z",
      },
      {
        name: "Practice 3",
        start: "2025-03-15T01:30:00.000Z",
        end: "2025-03-15T02:30:00.000Z",
      },
      {
        name: "Qualifying",
        start: "2025-03-15T05:00:00.000Z",
        end: "2025-03-15T06:00:00.000Z",
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
        name: "Sprint Qualifying",
        start: "2025-03-21T07:30:00.000Z",
        end: "2025-03-21T08:14:00.000Z",
      },
      {
        name: "Sprint",
        start: "2025-03-22T03:00:00.000Z",
        end: "2025-03-22T04:00:00.000Z",
      },
      {
        name: "Qualifying",
        start: "2025-03-22T07:00:00.000Z",
        end: "2025-03-22T08:00:00.000Z",
      },
      {
        name: "Race",
        start: "2025-03-23T06:00:00.000Z",
        end: "",
      },
    ],
  },
  {
    location: "japan",
    sessions: [
      {
        name: "Practice 1",
        start: "2025-04-04T02:30:00.000Z",
        end: "2025-04-04T03:30:00.000Z",
      },
      {
        name: "Practice 2",
        start: "2025-04-04T06:00:00.000Z",
        end: "2025-04-04T07:00:00.000Z",
      },
      {
        name: "Practice 3",
        start: "2025-04-05T02:30:00.000Z",
        end: "2025-04-05T03:30:00.000Z",
      },
      {
        name: "Qualifying",
        start: "2025-04-05T06:00:00.000Z",
        end: "2025-04-05T07:00:00.000Z",
      },
      {
        name: "Race",
        start: "2025-04-06T05:00:00.000Z",
        end: "",
      },
    ],
  },
];

// Past weekend fixture - all sessions in the past
export const pastWeekendFixture: Schedule = [
  {
    location: "bahrain",
    sessions: [
      {
        name: "Practice 1",
        start: "2024-01-14T13:30:00.000Z",
        end: "2024-01-14T14:30:00.000Z",
      },
      {
        name: "Practice 2",
        start: "2024-01-14T17:00:00.000Z",
        end: "2024-01-14T18:00:00.000Z",
      },
      {
        name: "Qualifying",
        start: "2024-01-15T16:00:00.000Z",
        end: "2024-01-15T17:00:00.000Z",
      },
      {
        name: "Race",
        start: "2024-01-16T15:00:00.000Z",
        end: "",
      },
    ],
  },
];

// Future weekend fixture - all sessions in the future
export const futureWeekendFixture: Schedule = [
  {
    location: "monaco",
    sessions: [
      {
        name: "Practice 1",
        start: "2026-05-22T11:30:00.000Z",
        end: "2026-05-22T12:30:00.000Z",
      },
      {
        name: "Practice 2",
        start: "2026-05-22T15:00:00.000Z",
        end: "2026-05-22T16:00:00.000Z",
      },
      {
        name: "Practice 3",
        start: "2026-05-23T10:30:00.000Z",
        end: "2026-05-23T11:30:00.000Z",
      },
      {
        name: "Qualifying",
        start: "2026-05-23T14:00:00.000Z",
        end: "2026-05-23T15:00:00.000Z",
      },
      {
        name: "Race",
        start: "2026-05-24T13:00:00.000Z",
        end: "",
      },
    ],
  },
  {
    location: "canada",
    sessions: [
      {
        name: "Practice 1",
        start: "2026-06-12T17:30:00.000Z",
        end: "2026-06-12T18:30:00.000Z",
      },
      {
        name: "Practice 2",
        start: "2026-06-12T21:00:00.000Z",
        end: "2026-06-12T22:00:00.000Z",
      },
      {
        name: "Practice 3",
        start: "2026-06-13T17:30:00.000Z",
        end: "2026-06-13T18:30:00.000Z",
      },
      {
        name: "Qualifying",
        start: "2026-06-13T21:00:00.000Z",
        end: "2026-06-13T22:00:00.000Z",
      },
      {
        name: "Race",
        start: "2026-06-14T19:00:00.000Z",
        end: "",
      },
    ],
  },
];

// Single weekend fixture - for isolated testing
export const singleWeekendFixture: Schedule = [
  {
    location: "spain",
    sessions: [
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
        name: "Qualifying",
        start: "2025-05-24T14:00:00.000Z",
        end: "2025-05-24T15:00:00.000Z",
      },
      {
        name: "Race",
        start: "2025-05-25T13:00:00.000Z",
        end: "",
      },
    ],
  },
];

// Empty schedule fixture - for edge case testing
export const emptyScheduleFixture: Schedule = [];

// Weekend with no sessions - for edge case testing
export const weekendWithNoSessionsFixture: Schedule = [
  {
    location: "miami",
    sessions: [],
  },
];

// Current session testing fixture - sessions designed for testing current session logic
export const currentSessionTestFixture: Schedule = [
  {
    location: "bahrain",
    sessions: [
      {
        name: "Practice 1",
        start: "2025-06-01T10:00:00.000Z",
        end: "2025-06-01T11:00:00.000Z",
      },
      {
        name: "Practice 2",
        start: "2025-06-01T14:00:00.000Z",
        end: "2025-06-01T15:00:00.000Z",
      },
      {
        name: "Qualifying",
        start: "2025-06-02T14:00:00.000Z",
        end: "2025-06-02T15:00:00.000Z",
      },
      {
        name: "Race",
        start: "2025-06-03T15:00:00.000Z",
        end: "", // Race end time is calculated (2 hours from start)
      },
    ],
  },
];

// Mixed timeline fixture - past, present, and future weekends
export const mixedTimelineFixture: Schedule = [...pastWeekendFixture, ...testScheduleFixture, ...futureWeekendFixture];
