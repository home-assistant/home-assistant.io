// The pull requests that fix a WTH on the Month of "What the Heck?!" page,
// /what-the-heck/: the cards in "Fix a WTH" and the counts above them.
//
// Both are fetched by `rake wth_stats_data` (see the Rakefile, where the first
// day that counts is set once for both builds) and written to
// source/_data/wth_stats.json before either build runs. Nothing is fetched
// here. A missing file, a malformed one or one without a single usable pull
// request all mean "nothing to show": the page leaves the section out and the
// build carries on.
//
// The Rake task checks what it writes. This checks it again, because it is
// the last stop before the markup: a pull request has to link to github.com
// and its picture has to come from GitHub's avatar host, or it is dropped.
// Titles are kept as plain text and are escaped where they are shown.
import fs from "node:fs";
import path from "node:path";

/** The sea has one lane on each of the four long pipes. */
export const SEA_LANES = 4;
/** A lane's run has at least this many cards, so it is wider than the sea
 *  however few pull requests there are. */
export const MIN_RUN = 4;
/** With reduced motion the sea is a grid of this many of the newest. */
export const GRID_SHOWN = 12;

const MAX_TITLE = 200;

// A URL on exactly this host over https, with no login in it and no port.
function httpsUrl(value, host) {
  if (typeof value !== "string") return null;
  let url;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  const plain = url.protocol === "https:" && url.hostname === host && !url.username && !url.password && !url.port;
  return plain ? url : null;
}

/** A pull request as the card shows it, or null when it is not usable. */
export function parsePullRequest(data) {
  if (!data || typeof data !== "object") return null;
  const { number, repo, author, status } = data;
  if (!Number.isInteger(number) || number < 1) return null;
  // Pull requests closed without being merged are not in the file; anything
  // else than these two is not shown.
  if (status !== "open" && status !== "merged") return null;
  if (typeof repo !== "string" || !/^[\w.-]+$/.test(repo)) return null;
  if (typeof author !== "string" || !/^[\w-]+$/.test(author)) return null;

  const link = httpsUrl(data.url, "github.com");
  if (!link || link.search || link.hash || !/^\/[\w.-]+\/[\w.-]+\/pull\/\d+$/.test(link.pathname)) return null;
  const avatar = httpsUrl(data.avatar, "avatars.githubusercontent.com");
  if (!avatar) return null;

  // One line of plain text, cut off where it gets silly.
  if (typeof data.title !== "string") return null;
  const title = data.title.replace(/[\p{Cc}\s]+/gu, " ").trim().slice(0, MAX_TITLE);
  if (!title) return null;

  return { number, title, repo, url: link.href, author, avatar: avatar.href, status };
}

/** The pull requests and counts as the page shows them, or null when there is
 *  nothing usable to show. */
export function parseWthStats(data) {
  if (!data || typeof data !== "object") return null;
  const { open, merged, url, since } = data;
  const count = (value) => Number.isInteger(value) && value >= 0;
  if (!count(open) || !count(merged)) return null;
  if (typeof url !== "string" || !url.startsWith("https://github.com/")) return null;
  if (!Array.isArray(data.prs)) return null;

  const prs = data.prs.map(parsePullRequest).filter(Boolean);
  if (prs.length === 0) return null;

  // "2026-01-01" reads "January 2026"; a date that does not parse is left
  // out of the sentence rather than shown wrong.
  const date = new Date(`${since}T00:00:00Z`);
  const sinceLabel = Number.isNaN(date.getTime())
    ? null
    : date.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

  return { open, merged, url, sinceLabel, prs };
}

/** Deals the pull requests out to the lanes of the sea, the same way as
 *  source/what-the-heck/components/_pull-requests.html. Lane n holds every
 *  fourth one from n, newest first: those are the ones keyboards and screen
 *  readers get. A lane with fewer than MIN_RUN is filled up with copies,
 *  carrying on every fourth around the list. `order` is the place in the
 *  list, for the grid reduced motion shows. */
export function seaLanes(prs, lanes = SEA_LANES, minRun = MIN_RUN) {
  const total = prs.length;
  if (total === 0) return [];
  return Array.from({ length: lanes }, (_, lane) => {
    const real = [];
    for (let order = lane; order < total; order += lanes) real.push({ pr: prs[order], order });
    const filler = [];
    for (let step = real.length; step < minRun; step++) {
      const order = (lane + lanes * step) % total;
      filler.push({ pr: prs[order], order });
    }
    return { real, filler, count: real.length + filler.length };
  });
}

/** Reads the file the Rake task wrote. `root` is the repository root. */
export function loadWthStats(root = path.resolve(process.cwd(), "..")) {
  try {
    return parseWthStats(JSON.parse(fs.readFileSync(path.join(root, "source/_data/wth_stats.json"), "utf8")));
  } catch {
    return null;
  }
}
