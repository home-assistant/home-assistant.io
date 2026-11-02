// The "pull requests that fix a WTH" counters on the Month of "What the
// Heck?!" page, /what-the-heck/.
//
// The numbers are counted by `rake wth_stats_data` (see the Rakefile, where
// the first day that counts is set once for both builds) and written to
// source/_data/wth_stats.json before either build runs. Nothing is fetched
// here. A missing file, a malformed one or a number that is not usable all
// mean "no counters": the page leaves the section out and the build carries
// on.
import fs from "node:fs";
import path from "node:path";

/** The counters as the page shows them, or null when there is nothing
 *  usable to show. */
export function parseWthStats(data) {
  if (!data || typeof data !== "object") return null;
  const { open, merged, url, since } = data;
  const count = (value) => Number.isInteger(value) && value >= 0;
  if (!count(open) || !count(merged)) return null;
  if (typeof url !== "string" || !url.startsWith("https://github.com/")) return null;

  // "2026-01-01" reads "January 2026"; a date that does not parse is left
  // out of the sentence rather than shown wrong.
  const date = new Date(`${since}T00:00:00Z`);
  const sinceLabel = Number.isNaN(date.getTime())
    ? null
    : date.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

  return { open, merged, url, sinceLabel };
}

/** Reads the file the Rake task wrote. `root` is the repository root. */
export function loadWthStats(root = path.resolve(process.cwd(), "..")) {
  try {
    return parseWthStats(JSON.parse(fs.readFileSync(path.join(root, "source/_data/wth_stats.json"), "utf8")));
  } catch {
    return null;
  }
}
