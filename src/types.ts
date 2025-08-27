import * as z from "zod";
import { locationURIs } from "./constants.js";

export type Location = (typeof locationURIs)[number];

const SessionSchema = z.object({
  name: z.string().nonempty(), // TODO make this an enum with all session types
  start: z.iso.datetime(),
  end: z.union([z.literal(""), z.iso.datetime()]), // the end date for a RACE session is scraped as an ""
});

const SessionsSchema = z.array(SessionSchema);

const WeekendSchema = z.object({
  location: z.enum(locationURIs),
  sessions: SessionsSchema,
});

export const ScheduleSchema = z.array(WeekendSchema);

const DriverResultSchema = z.object({
  position: z.number().nonnegative(),
  number: z.number().nonnegative(),
  driver: z.string().nonempty(), // todo make this a literal
  team: z.string().nonempty(), // todo make this a literal
  laps: z.number().nonnegative(),
  time: z.string().nonempty(),
  points: z.number().nonnegative(), //0-25
});

export const RaceResultsSchema = z.array(
  z.object({ location: z.string().nonempty(), results: z.array(DriverResultSchema) }),
);

export type RaceResultsType = z.infer<typeof RaceResultsSchema>;

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
