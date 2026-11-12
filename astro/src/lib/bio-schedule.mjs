// Which items of the bio page's lists are showing at a given moment.
// Shared by the build (src/lib/bio.mjs) and the script on the page
// (src/pages/bio/index.astro), so both apply the same rule. No Node
// imports here: this file also runs in the browser.
//
// The page is static, so the build can only get the lists right for the
// moment it runs. It also renders, hidden, every item that might show
// later: anything still to start, and anything that would take the place
// of an item that ends. The script runs this rule again with the
// website's time (from the server, not the visitor's clock) and shows or
// hides items to match. Without JavaScript, or if the time can't be read,
// the lists stay as they were at build time.
//
// Everything that depends on which items are up is decided here, not at
// build time, so it follows the clock:
//   - a link in the feeds appears once, under the strongest item that is
//     up (see `select`);
//   - a source's `limit` counts the items showing, not every item it has;
//   - a pinned source's fallback items show only while none of its pins is.

// An item is open from `starts` (inclusive) until `ends` (exclusive).
// Either can be missing. Values are Dates or ISO strings.
export function isOpen(item, now) {
  const time = (value) => (value === undefined || value === null || value === "" ? null : new Date(value).getTime());
  const starts = time(item.starts);
  const ends = time(item.ends);
  const at = new Date(now).getTime();
  return (starts === null || starts <= at) && (ends === null || ends > at);
}

// Returns, for each of `lists`, the keys of its entries showing at `now`,
// in order. Each list has `entries` (in display order), a `limit` (none
// means every entry), and `claims` (true for the feeds, whose links each
// show only once across the page). Each entry has `key`, `url`, `source`,
// and optionally `starts`, `ends`, `rank`, `cap` (its source's limit),
// `pinned`, `fallbackFor` (the pinned sources it stands in for) and
// `variant`.
//
// A link that several feed entries share goes to the one with the highest
// `rank` that is up (a pin, then a category feed such as releases, then
// the rest), and between equals to the earlier list, then the earlier
// entry. So a pin of a post shows instead of the post only while the pin
// is up, and on release day the release post shows under Releases rather
// than the general blog.
export function select(lists, now) {
  const candidates = lists.map((list) => {
    const open = list.entries.filter((entry) => isOpen(entry, now));
    const pinsUp = new Set(open.filter((entry) => entry.pinned).map((entry) => entry.source));
    return open.filter((entry) => !(entry.fallbackFor ?? []).some((source) => pinsUp.has(source)));
  });

  const owners = new Map();
  candidates.forEach((entries, list) => {
    if (!lists[list].claims) return;
    for (const entry of entries) {
      const rank = entry.rank ?? 0;
      const owner = owners.get(entry.url);
      if (!owner || rank > owner.rank) owners.set(entry.url, { rank, list, key: entry.key });
    }
  });

  return candidates.map((entries, list) => {
    const limit = lists[list].limit ?? Infinity;
    const counts = new Map();
    const keys = [];
    for (const entry of entries) {
      if (keys.length >= limit) break;
      // A hero and a row version of the same item share a key.
      if (keys.includes(entry.key)) continue;
      const owner = owners.get(entry.url);
      if (lists[list].claims && (owner.list !== list || owner.key !== entry.key)) continue;
      const count = counts.get(entry.source) ?? 0;
      if (entry.cap && count >= entry.cap) continue;
      counts.set(entry.source, count + 1);
      keys.push(entry.key);
    }
    return keys;
  });
}

// Whether one rendered entry is showing. A list that puts its first item
// in a large card renders the items that might end up first twice: a
// `hero` version, shown only in first place, and a `row` version, shown
// anywhere else. Entries without a variant show wherever they land.
// `heroTaken`: something else (a livestream card) has the large place,
// so the first item shows as a row too.
export function isShowing(entry, keys, heroTaken = false) {
  const position = keys.indexOf(entry.key);
  if (position === -1) return false;
  if (entry.variant === "hero") return position === 0 && !heroTaken;
  if (entry.variant === "row") return position > 0 || heroTaken;
  return true;
}
