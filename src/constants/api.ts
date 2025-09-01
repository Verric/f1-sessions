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
