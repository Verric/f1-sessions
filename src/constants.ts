import type { Location } from "./types.js";

export const BASE_URL = "https://www.formula1.com/en/racing/2025/" as const;

/**
 * Array ordering must match the order of the events
 * Strings must match F1's website URL hence why "great-britain" is hypphonated but "emiliaromagna" is not
 */
export const locationURIs = [
  "australia",
  "china",
  "japan",
  "bahrain",
  "saudi-arabia",
  "miami",
  "emiliaromagna",
  "monaco",
  "spain",
  "canada",
  "austria",
  "great-britain",
  "belgium",
  "hungary",
  "netherlands",
  "italy",
  "azerbaijan",
  "singapore",
  "united-states",
  "mexico",
  "brazil",
  "las-vegas",
  "qatar",
  "united-arab-emirates",
] as const;

export const TIME_ZONES: Record<Location, string> = {
  australia: "Australia/Melbourne",
  china: "Asia/Shanghai",
  japan: "Asia/Tokyo",
  bahrain: "Asia/Bahrain",
  "saudi-arabia": "Asia/Riyadh",
  miami: "America/New_York",
  emiliaromagna: "Europe/Rome",
  monaco: "Europe/Monaco",
  spain: "Europe/Madrid",
  canada: "America/Montreal",
  austria: "Europe/Vienna",
  "great-britain": "Europe/London",
  belgium: "Europe/Brussels",
  hungary: "Europe/Budapest",
  netherlands: "Europe/Amsterdam",
  italy: "Europe/Rome",
  azerbaijan: "Asia/Baku",
  singapore: "Asia/Singapore",
  "united-states": "America/Chicago",
  mexico: "America/Mexico_City",
  brazil: "America/Sao_Paulo",
  "las-vegas": "America/Los_Angeles",
  qatar: "Asia/Qatar",
  "united-arab-emirates": "Asia/Dubai",
} as const;

export const TRACK_NAMES: Record<Location, string> = {
  australia: "Australian Grand Prix",
  china: "Chinese Gran Prix",
  japan: "Japanese Grand Prix",
  bahrain: "Bahrain Grand Prix",
  "saudi-arabia": "Saudi Arabian Grand Prix",
  miami: "Miami Grand Prix",
  emiliaromagna: "Emilia Romagna (Imola) Grand Prix",
  monaco: "Monaco Grand Prix",
  spain: "Spanish Grand Prix",
  canada: "Canadian Grand Prix",
  austria: "Austrian Grand Prix",
  "great-britain": "British Grand Prix",
  belgium: "Belgium Grand Prix",
  hungary: "Hungarian Grand Prix",
  netherlands: "Dutch Grand Prix",
  italy: "Italian Grand Prix",
  azerbaijan: "Azerbaijanian Grand Prix",
  singapore: "Singapore Grand Prix",
  "united-states": "United States Grand Prix",
  mexico: "Mexican Grand Prix",
  brazil: "Brazilian Grand Prix",
  "las-vegas": "Las Vegas Grand Prix",
  qatar: "Qatar Grand Prix",
  "united-arab-emirates": "Abu Dhabi Grand Prix",
} as const;

export const MONTH_MAP = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
} as const;

export const HOST_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
