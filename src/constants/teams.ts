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

//Bit Fragile, but these names must match team names in race.json which in turn is scraped from the F1 site
// hexcodes are based on a reddit post "https://www.reddit.com/r/formula1/comments/1ixh2fp/f1_2025_hex_codes/"
// thanks to /u/BrazilF1 for these
export const TEAM_COLOURS = {
  Mercedes: "#00D7B6",
  "Red Bull Racing": "#4781D7",
  Ferrari: "#ED1131",
  McLaren: "#F47600",
  Alpine: "#00A1E8",
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
