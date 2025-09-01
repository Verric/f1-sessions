export const BASE_URL = "https://www.formula1.com/en/racing/2025/" as const;
export const BASE_URL_RACE = "https://www.formula1.com/en/results/2025/races/" as const;
//export const BASE_URL_SPRINT = "https://www.formula1.com/en/results/2025/races/1255/china/sprint-results"

/**
 * Array ordering must match the order of the events
 * Whatever the order is here, will be the order of the race indexes in race.json
 */
export const raceURIs = [
  "1254/australia/race-result",
  "1255/china/sprint-results",
  "1255/china/race-result",
  "1256/japan/race-result",
  "1257/bahrain/race-result",
  "1258/saudi-arabia/race-result",
  "1259/miami/sprint-results",
  "1259/miami/race-result",
  "1260/emilia-romagna/race-result",
  "1261/monaco/race-result",
  "1262/spain/race-result",
  "1263/canada/race-result",
  "1264/austria/race-result",
  "1277/great-britain/race-result", //dunno why it jumps to 1277 for this URL
  "1265/belgium/sprint-results",
  "1265/belgium/race-result",
  "1266/hungary/race-result",
  "1267/netherlands/race-result",
  "1268/italy/race-result",
  "1269/azerbaijan/race-result",
  "1270/singapore/race-result",
  "1271/united-states/sprint-results",
  "1271/united-states/race-result",
  "1272/mexico/race-result",
  "1273/brazil/sprint-results",
  "1273/brazil/race-result",
  "1274/las-vegas/race-result",
  "1275/qatar/sprint-results",
  "1275/qatar/race-result",
  "1276/united-arab-emirates/race-result",
] as const;
//const sprintRaces = ["china", "miami", "belgium", "united-states", "brazil", "qatar"] as const;
/**
 * Array ordering must match the order of the events
 * Strings must match F1's website URL hence why "great-britain" is hyphonated but "emiliaromagna" is not
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

export type Location = (typeof locationURIs)[number];

//keys are based of session/location URI's hence emiliaromagna not emilia-romagna
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

export type TEAM_NAMES =
  | "Mercedes"
  | "Red Bull Racing"
  | "Ferrari"
  | "McLaren"
  | "Alpine"
  | "Racing Bulls"
  | "Aston Martin"
  | "Williams"
  | "Kick Sauber"
  | "Haas";

//Bit Fragile, but these names must match team names in race.json
export const TEAM_COLOURS = {
  Mercedes: "#00D7B6",
  "Red Bull Racing": "#4781D7",
  Ferrari: "#ED1131	",
  McLaren: "#F47600	",
  Alpine: "#00A1E8	",
  "Racing Bulls": "#6C98FF",
  "Aston Martin": "#229971",
  Williams: "#1868DB	",
  "Kick Sauber": "#01C00E",
  Haas: "#9C9FA2",
} as const;

function hexToAnsi(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `\x1b[38;2;${r};${g};${b}m`;
}

export const colourText = (hex: string, text: string) => `${hexToAnsi(hex)}${text}\x1b[39m`;
