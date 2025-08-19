import { differenceInSeconds } from "date-fns";
import { Box, Text } from "ink";
import { useEffect, useState } from "react";

export function CountdownTimer({
  nextSessionTime,
}: {
  nextSessionTime: string;
}) {
  const [countdown, setCountdown] = useState(() => {
    // Calculate initial countdown right away
    const now = new Date();
    const seconds = differenceInSeconds(new Date(nextSessionTime), now);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${mins}m ${secs}s`;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const seconds = differenceInSeconds(new Date(nextSessionTime), now);

      if (seconds <= 0) {
        setCountdown("SESSION STARTED!");
        return;
      }

      const days = Math.floor(seconds / 86400);
      const hours = Math.floor((seconds % 86400) / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      setCountdown(`${days}d ${hours}h ${mins}m ${secs}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [nextSessionTime]);

  return (
    <Box>
      <Text color="green" bold>
        {countdown}
      </Text>
    </Box>
  );
}
