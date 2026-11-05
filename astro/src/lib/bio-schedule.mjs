// Which items of a bio page list are showing at a given moment. Shared by
// the build (src/lib/bio.mjs) and the script on the page
// (src/pages/bio/index.astro), so both apply the same rule. No Node
// imports here: this file also runs in the browser.
//
// The page is static, so the build can only get the list right for the
// moment it runs. It also renders, hidden, the items that might show
// later: anything with a `starts` still to come, and the items that would
// move up when a scheduled one ends. The script runs this rule again with
// the website's time (from the server, not the visitor's clock) and shows
// or hides items to match. Without JavaScript, or if the time can't be
// read, the list stays as it was at build time.

// An item is open from `starts` (inclusive) until `ends` (exclusive).
// Either can be missing. Values are Dates or ISO strings.
export function isOpen(item, now) {
  const time = (value) => (value === undefined || value === null || value === "" ? null : new Date(value).getTime());
  const starts = time(item.starts);
  const ends = time(item.ends);
  const at = new Date(now).getTime();
  return (starts === null || starts <= at) && (ends === null || ends > at);
}

// The keys of the items showing, in order: the open ones, at most `limit`
// of them. An item can appear more than once with the same key (a hero
// and a row version of the same card); it counts once.
export function showingKeys(items, limit, now) {
  const keys = [];
  for (const item of items) {
    if (keys.length >= limit) break;
    if (!keys.includes(item.key) && isOpen(item, now)) keys.push(item.key);
  }
  return keys;
}

// Whether one rendered entry is showing. A list that puts its first item
// in a large card renders the items that might end up first twice: a
// `hero` version, shown only in first place, and a `row` version, shown
// anywhere else. Entries without a variant show wherever they land.
export function isShowing(entry, keys) {
  const position = keys.indexOf(entry.key);
  if (position === -1) return false;
  if (entry.variant === "hero") return position === 0;
  if (entry.variant === "row") return position > 0;
  return true;
}
