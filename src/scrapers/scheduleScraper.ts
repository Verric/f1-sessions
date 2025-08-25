import { load } from "cheerio";
import { timeToUTCstring } from "../timeUtils.js";
import type { F1Session } from "../types.js";

/**
 * Obviously this is the most fragile part of this endeavour. This is very specific to the F1 page layout.
 * it has been a bit more tricky this time, since it appears their updated website has moved to utility
 * classes over traditional class names, so it's more of a find and traverse rather than just target names
 * This scrapes pages such as https://www.formula1.com/en/racing/2025/<event> eg https://www.formula1.com/en/racing/2025/monaco
 */
export function scrapeSessions(html: string) {
  const $ = load(html);
  const data: F1Session[] = [];
  $("ul")
    .first()
    .find("li")
    .each((_, li) => {
      const $li = $(li);

      const dateCol = $li.children("span").first();
      const day = dateCol.find("span").eq(0).text().trim();
      const month = dateCol.find("span").eq(1).text().trim();

      const times = $li
        .find("time")
        .map((_, t) => $(t).text().trim())
        .get();
      const [start, end] = times;
      const startHours = start?.split(":")[0];
      const startMinutes = start?.split(":")[1];

      const endHours = end?.split(":")[0];
      const endMinutes = end?.split(":")[1];

      const timeWrapper = $li.find("time").first().parent().parent();
      const name = timeWrapper.prev("span").text().trim();

      const isoStart = timeToUTCstring(
        month!,
        day!,
        startHours!,
        startMinutes!,
      );
      const isoEnd = timeToUTCstring(month!, day!, endHours!, endMinutes!);
      data.push({
        name,
        start: isoStart,
        end: isoEnd,
      });
    });
  return data;
}
