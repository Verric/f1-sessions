import { describe, expect, it } from "vitest";
import {
  getCountDown,
  getCurrentSession,
  getCurrentWeekend,
  getFollowingWeekend,
  getNextSession,
} from "../src/dataHelpers.js";
import {
  currentSessionTestFixture,
  emptyScheduleFixture,
  mixedTimelineFixture,
  pastWeekendFixture,
  testScheduleFixture,
} from "./fixtures/scheduleFixtures.js";

describe("dataHelpers", () => {
  describe("getCurrentWeekend", () => {
    it("should return the current weekend when now is within weekend timeframe", () => {
      // Test date during the Australia weekend (between first and last session)
      const now = new Date("2025-03-15T10:00:00.000Z");

      const result = getCurrentWeekend(testScheduleFixture, now);

      expect(result).not.toBeNull();
      expect(result?.location).toBe("australia");
      expect(result?.sessions).toHaveLength(5);
    });

    it("should return the second weekend when now is within that timeframe", () => {
      // Test date during the China weekend
      const now = new Date("2025-03-22T10:00:00.000Z");

      const result = getCurrentWeekend(testScheduleFixture, now);

      expect(result).not.toBeNull();
      expect(result?.location).toBe("china");
      expect(result?.sessions).toHaveLength(5);
    });

    it("should return null when no current weekend is found", () => {
      // Test date before any sessions
      const now = new Date("2025-01-01T00:00:00.000Z");

      const result = getCurrentWeekend(testScheduleFixture, now);

      expect(result).toBeNull();
    });

    it("should return null when now is after all weekends", () => {
      // Test date after all sessions
      const now = new Date("2025-12-31T23:59:59.000Z");

      const result = getCurrentWeekend(testScheduleFixture, now);

      expect(result).toBeNull();
    });

    it("should return null for empty schedule", () => {
      const now = new Date("2025-03-15T10:00:00.000Z");

      const result = getCurrentWeekend(emptyScheduleFixture, now);

      expect(result).toBeNull();
    });
  });

  describe("getFollowingWeekend", () => {
    it("should return the first weekend when now is before all sessions", () => {
      const now = new Date("2025-01-01T00:00:00.000Z");

      const result = getFollowingWeekend(testScheduleFixture, now);

      expect(result).not.toBeNull();
      expect(result?.location).toBe("australia");
    });

    it("should return the next weekend when now is during current weekend", () => {
      // Now is during Australia weekend
      const now = new Date("2025-03-15T10:00:00.000Z");

      const result = getFollowingWeekend(testScheduleFixture, now);

      expect(result).not.toBeNull();
      expect(result?.location).toBe("china");
    });

    it("should return the next weekend when now is between weekends", () => {
      // Now is between Australia and China weekends
      const now = new Date("2025-03-18T10:00:00.000Z");

      const result = getFollowingWeekend(testScheduleFixture, now);

      expect(result).not.toBeNull();
      expect(result?.location).toBe("china");
    });

    it("should return null when no future sessions exist", () => {
      // Test date after all sessions
      const now = new Date("2025-12-31T23:59:59.000Z");

      const result = getFollowingWeekend(testScheduleFixture, now);

      expect(result).toBeNull();
    });

    it("should return null for empty schedule", () => {
      const now = new Date("2025-03-15T10:00:00.000Z");

      const result = getFollowingWeekend(emptyScheduleFixture, now);

      expect(result).toBeNull();
    });

    it("should return null for past weekends only", () => {
      const now = new Date("2025-03-15T10:00:00.000Z");

      const result = getFollowingWeekend(pastWeekendFixture, now);

      expect(result).toBeNull();
    });
  });

  describe("getNextSession", () => {
    it("should return the first session when now is before all sessions", () => {
      const now = new Date("2025-01-01T00:00:00.000Z");

      const result = getNextSession(testScheduleFixture, now);

      expect(result).not.toBeNull();
      expect(result?.name).toBe("Practice 1");
      expect(result?.start).toBe("2025-03-14T01:30:00.000Z");
    });

    it("should return the next session within the same weekend", () => {
      // Now is after Practice 1 but before Practice 2 of Australia weekend
      const now = new Date("2025-03-14T03:00:00.000Z");

      const result = getNextSession(testScheduleFixture, now);

      expect(result).not.toBeNull();
      expect(result?.name).toBe("Practice 2");
      expect(result?.start).toBe("2025-03-14T05:00:00.000Z");
    });

    it("should return the first session of next weekend when current weekend is finished", () => {
      // Now is after Australia race but before China sessions
      const now = new Date("2025-03-17T10:00:00.000Z");

      const result = getNextSession(testScheduleFixture, now);

      expect(result).not.toBeNull();
      expect(result?.name).toBe("Practice 1");
      expect(result?.start).toBe("2025-03-21T03:30:00.000Z");
    });

    it("should return the last session when close to end of schedule", () => {
      // Now is during Japan weekend, before the race
      const now = new Date("2025-04-06T04:00:00.000Z");

      const result = getNextSession(testScheduleFixture, now);

      expect(result).not.toBeNull();
      expect(result?.name).toBe("Race");
      expect(result?.start).toBe("2025-04-06T05:00:00.000Z");
    });

    it("should return null when no future sessions exist", () => {
      const now = new Date("2025-12-31T23:59:59.000Z");

      const result = getNextSession(testScheduleFixture, now);

      expect(result).toBeNull();
    });

    it("should return null for empty schedule", () => {
      const now = new Date("2025-03-15T10:00:00.000Z");

      const result = getNextSession(emptyScheduleFixture, now);

      expect(result).toBeNull();
    });

    it("should work correctly with mixed timeline schedule", () => {
      // Test with schedule containing past, present, and future
      const now = new Date("2025-03-15T10:00:00.000Z");

      const result = getNextSession(mixedTimelineFixture, now);

      expect(result).not.toBeNull();
      expect(result?.name).toBe("Race");
      expect(result?.start).toBe("2025-03-16T04:00:00.000Z");
    });
  });

  describe("getCountDown", () => {
    it("should return correct countdown for future session", () => {
      // Mock the current time to be exactly 2 days, 5 hours, 30 minutes before session
      const mockNow = new Date("2025-03-12T10:00:00.000Z");
      const sessionTime = "2025-03-14T15:30:00.000Z";

      const result = getCountDown(sessionTime, mockNow);

      expect(result).toEqual({ days: 2, hours: 5, minutes: 30 });
    });

    it("should handle countdown less than a day", () => {
      const mockNow = new Date("2025-03-14T10:00:00.000Z");
      const sessionTime = "2025-03-14T15:30:00.000Z";

      const result = getCountDown(sessionTime, mockNow);

      expect(result).toEqual({ days: 0, hours: 5, minutes: 30 });
    });

    it("should handle countdown less than an hour", () => {
      const mockNow = new Date("2025-03-14T15:00:00.000Z");
      const sessionTime = "2025-03-14T15:45:00.000Z";

      const result = getCountDown(sessionTime, mockNow);

      expect(result).toEqual({ days: 0, hours: 0, minutes: 45 });
    });

    it("should handle exact time match", () => {
      const mockNow = new Date("2025-03-14T15:30:00.000Z");
      const sessionTime = "2025-03-14T15:30:00.000Z";

      const result = getCountDown(sessionTime, mockNow);

      expect(result).toEqual({ days: 0, hours: 0, minutes: 0 });
    });

    it("should handle large countdown values", () => {
      const mockNow = new Date("2025-01-01T00:00:00.000Z");
      const sessionTime = "2025-03-14T15:30:00.000Z";

      const result = getCountDown(sessionTime, mockNow);

      // Should be 72 days, 15 hours, 30 minutes
      expect(result).toEqual({ days: 72, hours: 15, minutes: 30 });
    });
  });

  describe("getCurrentSession", () => {
    it("should return the current session when now is during a session", () => {
      // Now is during Practice 1 (10:00-11:00)
      const now = new Date("2025-06-01T10:30:00.000Z");

      const result = getCurrentSession(currentSessionTestFixture, now);

      expect(result).not.toBeNull();
      expect(result?.name).toBe("Practice 1");
      expect(result?.start).toBe("2025-06-01T10:00:00.000Z");
    });

    it("should return the current session during Practice 2", () => {
      // Now is during Practice 2 (14:00-15:00)
      const now = new Date("2025-06-01T14:45:00.000Z");

      const result = getCurrentSession(currentSessionTestFixture, now);

      expect(result).not.toBeNull();
      expect(result?.name).toBe("Practice 2");
      expect(result?.start).toBe("2025-06-01T14:00:00.000Z");
    });

    it("should return the current session during Qualifying", () => {
      // Now is during Qualifying (14:00-15:00)
      const now = new Date("2025-06-02T14:15:00.000Z");

      const result = getCurrentSession(currentSessionTestFixture, now);

      expect(result).not.toBeNull();
      expect(result?.name).toBe("Qualifying");
      expect(result?.start).toBe("2025-06-02T14:00:00.000Z");
    });

    it("should return the Race when during race time (using 2-hour duration)", () => {
      // Now is during Race (15:00 + 2 hours = 17:00)
      const now = new Date("2025-06-03T16:00:00.000Z");

      const result = getCurrentSession(currentSessionTestFixture, now);

      expect(result).not.toBeNull();
      expect(result?.name).toBe("Race");
      expect(result?.start).toBe("2025-06-03T15:00:00.000Z");
    });

    it("should return null when now is between sessions", () => {
      // Now is between Practice 1 and Practice 2
      const now = new Date("2025-06-01T12:00:00.000Z");

      const result = getCurrentSession(currentSessionTestFixture, now);

      expect(result).toBeNull();
    });

    it("should return null when now is before all sessions", () => {
      const now = new Date("2025-05-31T00:00:00.000Z");

      const result = getCurrentSession(currentSessionTestFixture, now);

      expect(result).toBeNull();
    });

    it("should return null when now is after race ends", () => {
      // Now is after race ends (15:00 + 2 hours = 17:00)
      const now = new Date("2025-06-03T18:00:00.000Z");

      const result = getCurrentSession(currentSessionTestFixture, now);

      expect(result).toBeNull();
    });

    it("should return null for empty schedule", () => {
      const now = new Date("2025-06-01T10:30:00.000Z");

      const result = getCurrentSession(emptyScheduleFixture, now);

      expect(result).toBeNull();
    });
  });
});
