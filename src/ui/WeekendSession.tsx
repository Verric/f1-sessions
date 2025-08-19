import { formatInTimeZone } from "date-fns-tz";
import { Box, Text } from "ink";
import { HOST_TZ, TIME_ZONES } from "../constants.js";
import type { Weekend } from "../types.js";

export function WeekendSession({ weekend }: { weekend: Weekend }) {
  return (
    <Box flexDirection="column" marginTop={1}>
      <Box marginTop={1}>
        <Text color="yellow" bold>
          {weekend.location} Grand Prix
        </Text>
      </Box>
      <Box flexDirection="row">
        <Box width={20}>
          <Text color="grey">Session Name</Text>
        </Box>
        <Box width={20}>
          <Text color="grey">Local Time</Text>
        </Box>
        <Box width={20}>
          <Text color="grey">Track Time</Text>
        </Box>
      </Box>

      {weekend.sessions.map((session, idx) => (
        <Box key={session.name}>
          <Box width={20}>
            <Text color={idx % 2 === 0 ? "blue" : "white"}>
              {`${session.name}: `}{" "}
            </Text>
          </Box>
          <Box width={20}>
            <Text color={idx % 2 === 0 ? "blue" : "white"}>
              {formatInTimeZone(session.start, HOST_TZ, "MMM d h:mm a")}
            </Text>
          </Box>
          <Box width={20}>
            <Text color={idx % 2 === 0 ? "blue" : "whit"}>
              {formatInTimeZone(
                session.start,
                TIME_ZONES[weekend.location],
                "MMM d h:mm a",
              )}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
