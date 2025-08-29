import { performance } from "node:perf_hooks";
import pc from "picocolors";
import { colourText, HOST_TZ, TEAM_COLOURS, TIME_ZONES, TRACK_NAMES } from "./constants.js";
import { getCountDown } from "./dataHelpers.js";
import { formatTimeTz } from "./timeHelpers.js";
import type { CountDownData, F1Session, RaceResults, TeamStanding, Weekend } from "./types.js";

export function showCountDown(session: F1Session | null, weekend: Weekend | null, now: Date) {
  if (!weekend || !session) {
    process.stdout.write(pc.red("No Further Events"));
    return;
  }
  const formatCountDown = (data: CountDownData) => `${data.days}d ${data.hours}h ${data.minutes}m`;
  const countdown = getCountDown(session.start, now);
  const trackName = pc.greenBright(pc.bold(`${TRACK_NAMES[weekend.location]}`));
  const sessionName = pc.greenBright(session.name);
  const countdownString = pc.greenBright(formatCountDown(countdown));

  process.stdout.write(`🏎️ ${pc.red("F1 Sessions 2025")}\n`);
  process.stdout.write(`${trackName} / ${sessionName} / ${countdownString}\n`);
}

export function showWeekend(weekend: Weekend | null) {
  if (!weekend) {
    process.stdout.write(pc.red("No weekend data available\n"));
    return;
  }
  process.stdout.write(
    pc.gray(`${"Session Name".padEnd(20)} ${pc.gray("Local Time".padEnd(20))} ${pc.gray("Track Time")}\n`),
  );
  process.stdout.write(`${pc.gray("-".repeat(80))}\n`);
  const sessionString = weekend.sessions.reduce((total, session, idx) => {
    const colour = idx % 2 === 0 ? pc.blue : pc.white;
    const sessionName = colour(`${session.name}:`.padEnd(20));
    const localTime = colour(formatTimeTz(session.start, HOST_TZ).padEnd(20));
    const trackTime = colour(formatTimeTz(session.start, TIME_ZONES[weekend.location]));
    return `${total} ${sessionName} ${localTime} ${trackTime}\n`;
  }, "");
  process.stdout.write(sessionString);
}

export function showRaceResults(raceData: RaceResults, index: number) {
  const start = performance.now();
  const race = raceData[index];
  process.stdout.write(`Race Results: ${pc.greenBright(race!.location)}\n`);
  process.stdout.write(
    `${pc.gray(
      "Pos".padEnd(5) +
        "No.".padEnd(5) +
        "Driver".padEnd(20) +
        "Team".padEnd(20) +
        "Laps".padEnd(5) +
        "Time".padEnd(20) +
        "Points".padEnd(5),
    )}\n`,
  );
  process.stdout.write(`${pc.gray("-".repeat(80))}\n`);
  race!.results.forEach((result) => {
    const position = colourText(TEAM_COLOURS[result.team], result.position.toString().padEnd(5));
    const number = colourText(TEAM_COLOURS[result.team], result.number.toString().padEnd(5));
    const driver = colourText(TEAM_COLOURS[result.team], result.driver.padEnd(20));
    const team = colourText(TEAM_COLOURS[result.team], result.team.padEnd(20));
    const laps = colourText(TEAM_COLOURS[result.team], result.laps.toString().padEnd(5));
    const time = colourText(TEAM_COLOURS[result.team], result.time.padEnd(20));
    const points = colourText(TEAM_COLOURS[result.team], result.points.toString().padEnd(5));
    process.stdout.write(`${position}${number}${driver}${team}${laps}${time}${points}\n`);
  });
  const end = performance.now();
  console.log(`Race Results: ${(end - start).toFixed(5)}`);
}

export function showHelp() {
  console.log("Usage: node f1-sessions <options>");
  console.log("-s  Displays all sessions for the current or following race weekend");
}

export function showConstrutorLeaderboard(data: TeamStanding[]) {
  console.log();
  console.log(pc.greenBright(`Constructor's Championship`));
  console.log(pc.gray("Constructor".padEnd(20) + "Points".padEnd(20)));
  console.log(pc.gray("-".repeat(60)));
  for (const { team, colour, points } of data) {
    console.log(colourText(colour, team.padEnd(20)) + points.toString().padEnd(20));
  }
}

export function showDriversLeaderboard(data: Map<string, { points: number; colour: string }>) {
  console.log();
  console.log(pc.greenBright(`Drivers's Championship`));
  console.log(pc.gray("Driver".padEnd(20) + "Points".padEnd(20)));
  console.log(pc.gray("-".repeat(40)));
  for (const [driver, { points, colour }] of data.entries()) {
    console.log(colourText(colour, driver.padEnd(20)) + points.toString().padEnd(20));
  }
}
