## Motivation 

Currently (as of today), both the WEC and the WRC have countdown timers to the next session
on their websites, but not F1. Also it's eaiser to just open the terminal rather than a webpage
go to a link, wait for the page to load. Find the schedule or next race page.

## Current Features
- Real-time countdown to next session
- Displays next session time in track time and users local time (whatever `Intl.DateTimeFormat().resolvedOptions().timeZone;` returns)

## Roadmap

[] show times for upcoming entire race weekend
[] build into a single exectuable
[] add locale to date formatting

## Stretch goals

[] build interactive tables for race weekend results - Currently F1 has all this data but it is spread across multiple pages/tabs
