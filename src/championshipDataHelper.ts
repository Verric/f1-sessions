import { TEAM_COLOURS } from "./constants.js";
import type { RaceResultsType, TeamStanding } from "./types.js";

export function getConstructorLeaderboard(data: RaceResultsType): TeamStanding[] {
  const leaderBoard: Record<string, { points: number; colour: string }> = {};
  const raceResults = data.flatMap((res) => res.results);
  for (const { driver, points, team } of raceResults) {
    leaderBoard[driver] = {
      points: (leaderBoard[driver]?.points ?? 0) + Number(points),
      colour: TEAM_COLOURS[team as keyof typeof TEAM_COLOURS],
    };
  }

  return Object.entries(leaderBoard)
    .sort((a, b) => b[1].points - a[1].points)
    .map((datum) => ({
      team: datum[0],
      points: datum[1].points,
      colour: datum[1].colour,
    }));
}

//re-look into this, quick hack and chop
export function getDriversLeaderboard(data: RaceResultsType) {
  const leaderBoard = new Map<string, { points: number; colour: string }>();
  const raceResults = data.flatMap((res) => res.results);
  for (const { driver, points, team } of raceResults) {
    leaderBoard.set(driver, {
      points: (leaderBoard.get(driver)?.points ?? 0) + Number(points),
      colour: TEAM_COLOURS[team as keyof typeof TEAM_COLOURS],
    });
  }
  return new Map([...leaderBoard.entries()].sort((a, b) => b[1].points - a[1].points));
}
