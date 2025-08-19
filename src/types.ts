import * as z from "zod";
import { locationURIs } from "./constants.js";

export type Location = (typeof locationURIs)[number];

const SessionSchema = z.object({
  name: z.string().nonempty(), // TODO make this an enum with all session types
  start: z.iso.datetime(),
  end: z.union([z.literal(""), z.iso.datetime()]),
});

const SessionsSchema = z.array(SessionSchema);

const WeekendSchema = z.object({
  location: z.enum(locationURIs),
  sessions: SessionsSchema,
});

export const ScheduleSchema = z.array(WeekendSchema);

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
