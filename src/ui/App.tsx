import { Box, render, Text, useInput } from "ink";
import {
  getCurrentWeekend,
  getFollowingWeekend,
  getNextSession,
} from "../dataHelpers.js";
import type { F1Session, Schedule, Weekend } from "../types.js";
import { CountdownTimer } from "./CountdownTimer.js";
import { WeekendSession } from "./WeekendSession.js";

function App({ session, weekend }: { session: F1Session; weekend: Weekend }) {
  useInput((input, key) => {
    if (input === "q" || (key.ctrl && input === "c")) {
      process.exit(0);
    }
  });
  return (
    <Box flexDirection="column" padding={1}>
      <Text color="red">🏎️ F1 Sessions</Text>
      <CountdownTimer nextSessionTime={session.start} />
      <WeekendSession weekend={weekend} />
    </Box>
  );
}
export async function generateUI(data: Schedule) {
  const now = new Date();
  const session = getNextSession(data, now);
  const weekend =
    getCurrentWeekend(data, now) || getFollowingWeekend(data, now);
  if (session && weekend) {
    render(<App session={session} weekend={weekend} />);
  } else {
    render(<Text>"No upcoming sessions"</Text>);
  }
}
