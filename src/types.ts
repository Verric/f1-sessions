import type { Location, TEAM_NAMES } from "./constants.js";

// RACE DATA TYPES
interface DriverResult {
  position: number;
  number: number;
  driver: string;
  team: TEAM_NAMES;
  laps: string;
  time: string;
  points: number;
}

export interface RaceResult {
  location: Location;
  results: DriverResult[];
}

export type RaceResults = RaceResult[];

// SESSION AND SCHEDULE TYPES
export interface F1Session {
  name: string;
  start: string;
  end: string;
}

export interface Weekend {
  location: Location;
  sessions: F1Session[];
}

export type Schedule = Weekend[];

export interface CountDownData {
  days: number;
  hours: number;
  minutes: number;
}

// CHAMPIONSHIP TYPES
export interface TeamStanding {
  team: string;
  points: number;
  colour: string;
}

export interface DriverStanding {
  driver: string;
  points: number;
  colour: string;
}
