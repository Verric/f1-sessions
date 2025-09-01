import { type Cheerio, fromURL } from "cheerio";
import type { Element } from "domhandler";

export async function scrapeRaces(url: string) {
  const $ = await fromURL(url);
  const results: {
    position: string;
    number: string;
    driver: string;
    team: string;
    laps: string;
    time: string;
    points: string;
  }[] = [];

  $("table.f1-table tbody tr").each((_, row) => {
    const $row = $(row);
    const cells = $row.find("td");

    if (cells.length === 0) return; // Skip if no cells

    const result = {
      position: cells.eq(0).text().trim(),
      number: cells.eq(1).text().trim(),
      driver: extractDriverName(cells.eq(2)),
      team: cells.eq(3).text().trim(),
      laps: cells.eq(4).text().trim(),
      time: cells.eq(5).text().trim(),
      points: cells.eq(6).text().trim(),
    };

    results.push(result);
  });

  return results;
}

// site is mobile first, so if we just ask for the span it returns, 3 letter abbr instead of the full anme
function extractDriverName($cell: Cheerio<Element>) {
  const firstName = $cell.find("span .max-lg\\:hidden").first().text().trim();
  const lastName = $cell.find("span .max-md\\:hidden").first().text().trim();
  return `${firstName} ${lastName}`;
}
