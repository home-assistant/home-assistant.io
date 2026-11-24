// The link-in-bio page at /bio/, built from source/_data/bio.yml.
//
// The page is what the "link in bio" on social profiles points at, so it
// is assembled from what the site already has: blog posts, release notes
// and their social images, plus the newsletter editions that
// `rake newsletter_data` downloads before the build. Nothing is fetched
// here, so the page cannot slow down or break the build for reasons
// outside the repository.
//
// bio.yml is edited by people who don't run the site locally, so every
// mistake fails the build with the key path at fault, rather than
// silently rendering an empty section on the live page.
import fs from "node:fs";
import path from "node:path";
import { isShowing, select } from "./bio-schedule.mjs";

const SECTION_TYPES = ["links", "feed"];
const SOURCE_TYPES = ["posts", "pinned", "data"];
const OG_ENDPOINT = "https://assets.openhomefoundation.org/opengraph";

export const PLATFORMS = {
  mastodon: "Mastodon",
  instagram: "Instagram",
  github: "GitHub",
  youtube: "YouTube",
  discord: "Discord",
  reddit: "Reddit",
  x: "X",
  linkedin: "LinkedIn",
  bluesky: "Bluesky",
  facebook: "Facebook",
  tiktok: "TikTok",
  threads: "Threads",
  rss: "RSS",
  web: "Website",
};

export class BioConfigError extends Error {}

const fail = (keyPath, message) => {
  throw new BioConfigError(`source/_data/bio.yml ${keyPath}: ${message}`.replace(" :", ":"));
};

const blank = (value) => value === undefined || value === null || String(value).trim() === "";
const isMap = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const has = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

// -- Dates --------------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}(?::\d{2})?(?: ?(?:Z|[+-]\d{2}:?\d{2}))?)?$/;

// Dates in bio.yml must be ISO. A lenient parser would happily read
// "31/11/2026" or "01/11/2026" as some other day instead of rejecting it.
// Times without a zone are UTC, the site's time zone (_config.yml).
export function parseTime(value, keyPath) {
  if (value === undefined || value === null) return null;
  if (value instanceof Date) return value;
  const text = String(value).trim();
  if (!ISO_DATE.test(text)) fail(keyPath, `"${value}" is not a date. Use YYYY-MM-DD`);
  let iso = text.replace(" ", "T");
  if (iso.length === 10) iso += "T00:00:00";
  if (!/(Z|[+-]\d{2}:?\d{2})$/.test(iso)) iso += "Z";
  const date = new Date(iso.replace(/ ([+-])/, "$1"));
  const calendar = new Date(`${text.slice(0, 10)}T00:00:00Z`);
  if (
    Number.isNaN(date.getTime()) ||
    Number.isNaN(calendar.getTime()) ||
    calendar.toISOString().slice(0, 10) !== text.slice(0, 10)
  ) fail(keyPath, `"${value}" is not a date. Use YYYY-MM-DD`);
  return date;
}

// A start time was given, not just a day.
const hasTime = (value) =>
  value instanceof Date
    ? value.getUTCHours() !== 0 || value.getUTCMinutes() !== 0
    : /\d{2}:\d{2}/.test(String(value));

const DAY = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const DAY_NO_YEAR = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", timeZone: "UTC" });
const TIME = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" });

export const formatDay = (date) => DAY.format(date);

const DAY_MS = 24 * 60 * 60 * 1000;
const startOfDay = (date) => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

// An `ends` with only a day keeps the item up through that whole day:
// `ends: 2026-11-15` hides it at midnight UTC as the 16th begins. With a
// time, it hides at that time.
export function parseEnd(value, keyPath) {
  const date = parseTime(value, keyPath);
  if (!date || hasTime(value)) return date;
  return new Date(date.getTime() + DAY_MS);
}

// When an item shows: from `starts` until `ends`.
function windowOf(item, keyPath = "item") {
  return { starts: parseTime(item.starts, `${keyPath}.starts`), ends: parseEnd(item.ends, `${keyPath}.ends`) };
}

// Keys that were renamed, or are easy to reach for. Naming the right key
// beats an item that silently ignores its dates.
function validateWindow(item, keyPath, video = false) {
  const renamed = { expires: "ends", start: video ? "airs" : "starts", date: video ? "airs" : "starts" };
  for (const [old, current] of Object.entries(renamed)) {
    if (has(item, old)) fail(`${keyPath}.${old}`, `is now called ${current}`);
  }
  const { starts, ends } = windowOf(item, keyPath);
  if (starts && ends && ends <= starts) fail(`${keyPath}.ends`, "must be after starts");
}

// -- YouTube ------------------------------------------------------------------

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

// Accepts a bare video ID or any of the usual YouTube links.
export function youtubeId(value) {
  const text = String(value ?? "").trim();
  if (YOUTUBE_ID.test(text)) return text;
  let url;
  try {
    url = new URL(text);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^(www|m)\./, "");
  let id = null;
  if (host === "youtu.be") id = url.pathname.slice(1);
  else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    id = url.searchParams.get("v") ?? url.pathname.match(/^\/(?:live|shorts|embed)\/([^/]+)/)?.[1] ?? null;
  }
  return id && YOUTUBE_ID.test(id) ? id : null;
}

// -- Validation ---------------------------------------------------------------

export function validate(config) {
  if (!isMap(config)) fail("", "is empty or missing");

  const sources = config.sources ?? {};
  if (!isMap(sources)) fail("sources", "must be a map of name: source");
  for (const [name, source] of Object.entries(sources)) validateSource(name, source, sources);
  for (const name of Object.keys(sources)) detectCycle(name, sources);

  const sections = config.sections ?? [];
  if (!Array.isArray(sections)) fail("sections", "must be a list");
  sections.forEach((section, index) => validateSection(section, index, sources));

  (config.socials ?? []).forEach((social, index) => {
    const keyPath = `socials[${index}]`;
    if (!has(PLATFORMS, social?.platform)) {
      fail(`${keyPath}.platform`, `must be one of: ${Object.keys(PLATFORMS).join(", ")}`);
    }
    requireUrl(social, keyPath);
  });

  return true;
}

function validateSource(name, source, sources) {
  const keyPath = `sources.${name}`;
  if (!isMap(source)) fail(keyPath, "must be a map");
  if (!SOURCE_TYPES.includes(source.type)) fail(`${keyPath}.type`, `must be one of: ${SOURCE_TYPES.join(", ")}`);
  if (has(source, "label") && blank(source.label)) fail(`${keyPath}.label`, "must be text, e.g. Newsletter");
  if (has(source, "limit")) validateLimit(source.limit, `${keyPath}.limit`);
  if (has(source, "exclude_category") && source.type !== "posts") {
    fail(`${keyPath}.exclude_category`, "only works on sources of type posts");
  }
  if (source.type === "data") {
    if (!/^[\w-]+$/.test(String(source.file ?? ""))) {
      fail(`${keyPath}.file`, "must name a data file, e.g. newsletter_data for source/_data/newsletter_data.json");
    }
    return;
  }
  if (source.type !== "pinned") return;

  (source.items ?? []).forEach((item, index) => {
    const itemPath = `${keyPath}.items[${index}]`;
    if (blank(item?.title)) fail(`${itemPath}.title`, "is required");
    requireUrl(item, itemPath);
    validateWindow(item, itemPath);
  });

  if (source.fallback === undefined || source.fallback === null) return;
  if (!has(sources, source.fallback)) {
    fail(`${keyPath}.fallback`, `unknown source "${source.fallback}". Declared: ${Object.keys(sources).join(", ")}`);
  }
}

// A self-reference check misses longer loops (a → b → a), which would
// otherwise recurse until the stack gives out.
function detectCycle(start, sources) {
  const seen = [];
  let name = start;
  while (name !== undefined && name !== null) {
    if (seen.includes(name)) fail(`sources.${start}.fallback`, `fallback loop: ${[...seen, name].join(" → ")}`);
    seen.push(name);
    name = sources[name]?.fallback;
  }
}

function validateSection(section, index, sources) {
  const keyPath = `sections[${index}]`;
  if (!isMap(section)) fail(keyPath, "must be a map");
  if (!SECTION_TYPES.includes(section.type)) fail(`${keyPath}.type`, `must be one of: ${SECTION_TYPES.join(", ")}`);
  if (has(section, "hero") && typeof section.hero !== "boolean") fail(`${keyPath}.hero`, "must be true or false");
  if (has(section, "livestream")) {
    if (section.type !== "feed") fail(`${keyPath}.livestream`, "only works on a feed section");
    if (!/^[a-z0-9-]+$/.test(String(section.livestream ?? ""))) {
      fail(`${keyPath}.livestream`, "must be a livestream channel name, e.g. home-assistant");
    }
  }

  if (section.type === "feed") {
    if (has(section, "source") === has(section, "sources")) {
      fail(keyPath, "needs either source: one-source or sources: [a, b], not both");
    }
    const key = has(section, "sources") ? "sources" : "source";
    const names = sectionSources(section);
    if (names.length === 0) fail(`${keyPath}.sources`, "must be a non-empty list of source names");
    for (const name of names) {
      if (!has(sources, name)) {
        fail(`${keyPath}.${key}`, `unknown source "${name}". Declared: ${Object.keys(sources).join(", ")}`);
      }
    }
    validateLimit(section.limit ?? 1, `${keyPath}.limit`);
    if (has(section, "insert")) validateInserts(section.insert, `${keyPath}.insert`);
    return;
  }

  const items = section.items;
  if (!Array.isArray(items) || items.length === 0) fail(`${keyPath}.items`, "must be a non-empty list");
  items.forEach((item, itemIndex) => {
    const itemPath = `${keyPath}.items[${itemIndex}]`;
    if (blank(item?.label)) fail(`${itemPath}.label`, "is required");
    requireUrl(item, itemPath);
    validateWindow(item, itemPath);
  });
}

// Items written straight into a feed. `starts` is when one appears, and
// also where it sits and the date shown on it, as a post's publish date
// is, so it is required: a scheduled item comes in at the top. A YouTube
// video takes its link and picture from the video, and its place and
// date from when it `airs`; `starts` on a video only shows it early.
// Any of them can have `ends`.
function validateInserts(inserts, keyPath) {
  if (!Array.isArray(inserts)) fail(keyPath, "must be a list of items");

  inserts.forEach((item, index) => {
    const itemPath = `${keyPath}[${index}]`;
    if (!isMap(item)) fail(itemPath, "must be a map with title, url and starts");
    if (blank(item.title)) fail(`${itemPath}.title`, "is required");
    if (has(item, "label") && blank(item.label)) fail(`${itemPath}.label`, "must be text, e.g. Event");
    validateWindow(item, itemPath, item.type === "youtube");

    if (item.type === "youtube") {
      if (!youtubeId(item.video)) {
        fail(`${itemPath}.video`, "must be a YouTube video ID or link, e.g. https://www.youtube.com/watch?v=XyAL1to3Lm4");
      }
      if (blank(item.airs)) fail(`${itemPath}.airs`, "is required, e.g. 2026-11-15T18:00:00Z");
      parseTime(item.airs, `${itemPath}.airs`);
      return;
    }
    if (has(item, "type")) fail(`${itemPath}.type`, "must be youtube, or left out for a plain link");

    requireUrl(item, itemPath);
    if (blank(item.starts)) fail(`${itemPath}.starts`, "is required: when it appears, e.g. 2026-11-01");
  });
}

function validateLimit(limit, keyPath) {
  if (Number.isInteger(limit) && limit >= 1 && limit <= 10) return;
  fail(keyPath, "must be a whole number from 1 to 10");
}

// `source: blog` and `sources: [latest, newsletter]` both work.
const sectionSources = (section) => [section.sources ?? section.source].flat().filter((name) => name !== undefined).map(String);

function requireUrl(item, keyPath) {
  const url = String(item?.url ?? "");
  if (url.startsWith("/") || url.startsWith("https://") || url.startsWith("http://")) return;
  fail(`${keyPath}.url`, "must be a site path like /blog/ or a full https:// URL");
}

// -- Posts --------------------------------------------------------------------

// Reads the front matter keys the bio page uses from every post, the way
// src/lib/site.mjs reads the latest release: post files start with their
// date, and the keys used here are plain scalars or lists of scalars.
// Like Jekyll, unpublished and future-dated posts are left out.
export function loadPosts(dir, now) {
  const posts = [];
  for (const file of fs.readdirSync(dir)) {
    const match = file.match(/^(\d{4})-(\d\d)-(\d\d)-(.+)\.(markdown|md)$/);
    if (!match) continue;
    const text = fs.readFileSync(path.join(dir, file), "utf8");
    const data = readFrontMatter(text.split(/^---\s*$/m)[1] ?? "");
    if (data.published === false) continue;
    // As Jekyll: `categories: Announcements Events` is two categories.
    if (typeof data.categories === "string") data.categories = data.categories.split(/\s+/).filter(Boolean);

    const date = data.date ? parsePostDate(data.date) : new Date(`${match[1]}-${match[2]}-${match[3]}T00:00:00Z`);
    if (!date || date > now) continue;

    const iso = date.toISOString();
    const slug = data.slug ?? match[4];
    const url = data.permalink ?? `/blog/${iso.slice(0, 4)}/${iso.slice(5, 7)}/${iso.slice(8, 10)}/${slug}/`;

    // As plugins/crosspost_og.rb: a crosspost without its own image gets the
    // Open Graph image of the article it points to.
    if (data.external_url && !data.og_image) data.og_image = `${OG_ENDPOINT}?url=${data.external_url}`;

    posts.push({ url, date, data });
  }
  return posts;
}

function parsePostDate(value) {
  const text = String(value).trim();
  const match = text.match(/^(\d{4}-\d{2}-\d{2})(?:[ T](\d{2}:\d{2}(?::\d{2})?))?\s*(Z|[+-]\d{2}:?\d{2})?$/);
  if (!match) return null;
  const zone = match[3] ? match[3].replace(/^([+-]\d{2})(\d{2})$/, "$1:$2") : "Z";
  const date = new Date(`${match[1]}T${match[2] ?? "00:00:00"}${zone}`);
  return Number.isNaN(date.getTime()) ? null : date;
}

const KEYS = new Set(["title", "date", "categories", "og_image", "external_url", "published", "slug", "permalink"]);

function readFrontMatter(block) {
  const data = {};
  const lines = block.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^([\w-]+):\s*(.*?)\s*$/);
    if (!match || !KEYS.has(match[1])) continue;
    const [, key, raw] = match;
    if (raw === "") {
      // A block list: the indented "- item" lines below.
      const list = [];
      while (i + 1 < lines.length && /^\s+-\s/.test(lines[i + 1])) list.push(scalar(lines[++i].replace(/^\s+-\s+/, "")));
      data[key] = list;
    } else if (raw.startsWith("[")) {
      data[key] = raw.slice(1, -1).split(",").map((item) => scalar(item.trim())).filter(Boolean);
    } else {
      data[key] = scalar(raw);
    }
  }
  return data;
}

function scalar(raw) {
  // A # inside quotes is text ("Podcast #10"), not a comment.
  const quoted = raw.trim().match(/^("(?:[^"\\]|\\.)*"|'(?:[^']|'')*')(?:\s+#.*)?$/);
  const text = quoted ? quoted[1] : raw.replace(/\s+#.*$/, "").trim();
  if (text === "true") return true;
  if (text === "false") return false;
  if (text.startsWith('"') && text.endsWith('"')) {
    try {
      return JSON.parse(text);
    } catch {
      return text.slice(1, -1);
    }
  }
  if (text.startsWith("'") && text.endsWith("'")) return text.slice(1, -1).replace(/''/g, "'");
  return text;
}

// -- Resolution ---------------------------------------------------------------

// Plain objects for the page: only sections with something to show. An
// empty section would render as a heading above nothing.
//
// Each section has:
//   - `entries`: everything to render, in order, including items that only
//     show later. Each has `hidden` (not showing at build time) and what
//     the rule in bio-schedule.mjs needs to show and hide it as time
//     passes: `key`, `url`, `source`, `starts`, `ends`, and maybe `cap`,
//     `pinned`, `fallbackFor` and `variant`.
//   - `tiles`: the entries showing at build time.
//   - `limit`, `claims`: how the rule treats the list, and `order`, its
//     place among the page's lists.
//   - `hidden`: nothing is showing yet, but something will.
export function resolve(config, posts, now, siteUrl, data = {}) {
  const sources = config.sources ?? {};
  const newestFirst = [...posts].sort((a, b) => b.date - a.date);
  const sections = config.sections ?? [];
  const lists = buildLists(sections, sources, newestFirst, now, data, siteUrl);
  select(lists, now).forEach((keys, index) => (lists[index].keys = keys));

  return sections.flatMap((section, index) => {
    const list = lists[index];
    if (!list || list.entries.length === 0) return [];
    const entries = list.entries.map((entry) => ({ ...entry, hidden: !isShowing(entry, list.keys) }));
    const tiles = entries.filter((entry) => !entry.hidden);
    return [
      {
        title: section.title,
        type: section.type,
        order: list.order,
        limit: Number.isFinite(list.limit) ? list.limit : null,
        claims: list.claims,
        livestream: section.livestream ?? null,
        entries,
        tiles,
        hidden: tiles.length === 0,
      },
    ];
  });
}

// Feeds first, then curated links, each in YAML order. Curated links
// don't claim links, so the store can be in Latest and Featured at once.
function buildLists(sections, sources, posts, now, data, siteUrl) {
  const merged = sections.map((section) => (section.type === "feed" ? mergedItems(section, sources, posts, now, data) : null));
  const holders = linkHolders(merged, sources, now);
  return sections.map((section, index) => {
    if (section.type !== "feed") {
      return { order: index, limit: Infinity, claims: false, entries: linkEntries(section, posts, siteUrl, now) };
    }
    const limit = section.limit ?? 1;
    const kept = canShow(merged[index], index, limit, holders, sources, now);
    return { order: index, limit, claims: true, entries: feedEntries(kept, section, sources, posts, siteUrl, now) };
  });
}

// Up from now on, until it's removed: nothing about it will change.
const fixed = (item, now) => (!item.starts || item.starts <= now) && !item.ends;
const isPinned = (item, sources) => sources[item.source]?.type === "pinned";

// How strong an item's claim to its link is (see select in
// bio-schedule.mjs): someone chose a pin; a category feed describes a
// post better than the general blog does.
function rankOf(item, sources) {
  if (isPinned(item, sources)) return 2;
  return sources[item.source]?.category ? 1 : 0;
}

// Pinned sources with a pin that is up for good: their fallback never shows.
function pinnedForGood(items, sources, now) {
  return new Set(items.filter((item) => isPinned(item, sources) && fixed(item, now)).map((item) => item.source));
}

const shut = (item, forGood) => (item.fallbackFor ?? []).some((source) => forGood.has(source));

// Every feed item that might show, by link, to see which could take a
// link from another.
function linkHolders(merged, sources, now) {
  const holders = new Map();
  merged.forEach((items, list) => {
    if (!items) return;
    const forGood = pinnedForGood(items, sources, now);
    items.forEach((item, position) => {
      if (shut(item, forGood)) return;
      const holder = { list, position, rank: rankOf(item, sources), always: fixed(item, now) && !(item.fallbackFor ?? []).length };
      holders.set(item.url, [...(holders.get(item.url) ?? []), holder]);
    });
  });
  return holders;
}

// Who gets a link when both are up: the higher rank, then the earlier
// list, then the earlier item. The same order as select.
const beats = (a, b) => a.rank > b.rank || (a.rank === b.rank && (a.list < b.list || (a.list === b.list && a.position < b.position)));

// The items of a feed that might ever show, each marked `sure` if it is
// certain to show whenever the list gets that far: it is up for good,
// stands in for no pin, and nothing could take its link. Once the list
// has `limit` sure items, nothing after them can show. Leaving out what
// can never show keeps the page small: the blog alone has hundreds of
// posts.
function canShow(items, list, limit, holders, sources, now) {
  const forGood = pinnedForGood(items, sources, now);
  const kept = [];
  const sureBySource = new Map();
  let sure = 0;
  items.forEach((item, position) => {
    if (sure >= limit || shut(item, forGood)) return;
    const me = { list, position, rank: rankOf(item, sources) };
    const rivals = (holders.get(item.url) ?? []).filter((holder) => beats(holder, me));
    // Something always up takes the link.
    if (rivals.some((holder) => holder.always)) return;
    // The source is full with items that always show.
    const cap = sources[item.source]?.limit;
    if (cap && (sureBySource.get(item.source) ?? 0) >= cap) return;

    const isSure = fixed(item, now) && !(item.fallbackFor ?? []).length && rivals.length === 0;
    kept.push({ ...item, rank: me.rank, sure: isSure });
    if (!isSure) return;
    sure++;
    sureBySource.set(item.source, (sureBySource.get(item.source) ?? 0) + 1);
  });
  return kept;
}

// A large first card can only go to an item that might come first: one
// with nothing sure to show before it. Those get a hero version and,
// unless they are always first, a row version too. Without an image an
// item stays a normal tile rather than a card with a hole. A video
// already is a large card. With a `livestream`, the first item gets a row
// version too: the livestream card takes the large place while there is
// a stream to show.
function feedEntries(items, section, sources, posts, siteUrl, now) {
  return items.flatMap((item, index) => {
    const base = {
      key: String(index),
      url: item.url,
      source: item.source,
      rank: item.rank,
      cap: sources[item.source]?.limit ?? null,
      pinned: isPinned(item, sources),
      fallbackFor: item.fallbackFor ?? [],
      starts: item.starts ?? null,
      ends: item.ends ?? null,
    };
    const row = { ...feedTile(item, section, sources, posts, siteUrl, now, false), ...base };
    if (section.hero !== true || item.video || items.slice(0, index).some((before) => before.sure)) return [row];

    const hero = { ...feedTile(item, section, sources, posts, siteUrl, now, true), ...base, kind: "hero" };
    if (!hero.image) return [row];
    if (index === 0 && !section.livestream) return [hero];
    return [
      { ...hero, variant: "hero" },
      { ...row, variant: "row" },
    ];
  });
}

// A resolved feed section with its large first place given to something
// else (a livestream card, known when the page is built): the item in that
// place shows as its row version instead, as the page's script does once
// the card appears.
export function withHeroTaken(section) {
  const hero = section.entries.find((entry) => entry.variant === "hero" && !entry.hidden);
  if (!hero) return { ...section, heroTaken: true };
  const entries = section.entries.map((entry) => {
    if (entry === hero) return { ...entry, hidden: true };
    if (entry.variant === "row" && entry.key === hero.key) return { ...entry, hidden: false };
    return entry;
  });
  return { ...section, entries, tiles: entries.filter((entry) => !entry.hidden), heroTaken: true };
}

// Curated links, minus those that have ended. Links have no limit.
function linkEntries(section, posts, siteUrl, now) {
  return section.items.flatMap((item, index) => {
    const window = windowOf(item);
    if (window.ends && window.ends <= now) return [];
    return [{ ...linkTile(item, posts, siteUrl), key: String(index), url: item.url, ...window }];
  });
}

// Everything a feed section's sources produce, as one list: pins first,
// because someone chose them, then the rest newest first, whichever feed
// they came from. Duplicate links and each source's `limit` are left to
// the rule in bio-schedule.mjs, because which items win depends on which
// are up at the time.
function mergedItems(section, sources, posts, now, data) {
  const items = [
    ...sectionSources(section).flatMap((name) => resolveSource(name, sources, posts, now, data)),
    ...insertedItems(section),
  ].filter((item) => !(item.ends && item.ends <= now));

  const pinned = items.filter((item) => isPinned(item, sources));
  const dated = items
    .filter((item) => !isPinned(item, sources))
    .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));
  return [...pinned, ...dated];
}

// `insert:` entries on a feed section. They have no source of their own,
// so they carry their own label and take their place by `starts` (a
// video by `airs`).
//
// A video without an `ends` comes down at the end of the day after it
// airs (UTC), so a livestream doesn't linger once it's over.
function insertedItems(section) {
  return (section.insert ?? []).map((item) => {
    const window = windowOf(item);
    if (item.type === "youtube") {
      const id = youtubeId(item.video);
      const airs = parseTime(item.airs, "insert");
      return {
        title: item.title,
        url: `https://www.youtube.com/watch?v=${id}`,
        date: airs,
        timed: hasTime(item.airs),
        image: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        label: item.label,
        video: true,
        source: "inserted",
        starts: window.starts,
        ends: window.ends ?? new Date(startOfDay(airs).getTime() + 2 * DAY_MS),
      };
    }
    return {
      title: item.title,
      url: item.url,
      date: window.starts,
      image: item.image,
      label: item.label,
      source: "inserted",
      ...window,
    };
  });
}

function resolveSource(name, sources, posts, now, data = {}, seen = []) {
  const source = sources[name];
  if (!source || seen.includes(name)) return [];

  let items = [];
  if (source.type === "posts") items = postsFor(source, posts, name);
  else if (source.type === "data") items = dataItems(data[source.file], name);
  else if (source.type === "pinned") {
    items = (source.items ?? [])
      .map((item) => ({ ...item, ...windowOf(item, name), source: name }))
      .filter((item) => !(item.ends && item.ends <= now));
  }
  if (!source.fallback) return items;

  const fallback = () => resolveSource(source.fallback, sources, posts, now, data, [...seen, name]);
  // An empty source is not an error: it means "use the fallback".
  if (source.type !== "pinned") return items.length > 0 ? items : fallback();

  // A pinned source's fallback shows whenever none of its pins is up, so
  // its items come along, marked, unless a pin is up for good.
  if (items.some((item) => fixed(item, now))) return items;
  return [...items, ...fallback().map((item) => ({ ...item, fallbackFor: [...(item.fallbackFor ?? []), name] }))];
}

// Items downloaded before the build, such as the newsletter (the
// newsletter_data task in the Rakefile). The download never fails the
// build, so a missing file, an empty list or a malformed entry just means
// fewer items, never an error.
export function dataItems(list, name) {
  if (!Array.isArray(list)) return [];
  return list
    .flatMap((entry) => {
      if (!isMap(entry) || blank(entry.title) || blank(entry.url)) return [];
      const date = blank(entry.date) ? null : new Date(entry.date);
      return [
        {
          title: entry.title,
          url: entry.url,
          date: date && !Number.isNaN(date.getTime()) ? date : null,
          image: entry.image,
          source: name,
        },
      ];
    })
    .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));
}

function postsFor(source, posts, name) {
  const lower = (values) => [values ?? []].flat().map((value) => String(value).toLowerCase());
  const include = lower(source.category);
  const exclude = lower(source.exclude_category);
  return posts
    .filter((post) => {
      const categories = lower(post.data.categories);
      return (include.length === 0 || include.some((c) => categories.includes(c))) && !exclude.some((c) => categories.includes(c));
    })
    .map((post) => ({
      title: post.data.title,
      // A crosspost exists only to redirect elsewhere; link straight there.
      url: post.data.external_url || post.url,
      date: post.date,
      image: post.data.og_image,
      source: name,
    }));
}

function feedTile(item, section, sources, posts, siteUrl, now, hero) {
  const label = item.label ?? sources[item.source]?.label;

  if (item.video) {
    // Before it airs: "Livestream · Starts November 15 · 18:00 UTC". The
    // script on the page swaps in `noteAfter` once it has started.
    const upcoming = item.date > now;
    const before = ["Starts " + DAY_NO_YEAR.format(item.date), item.timed ? `${TIME.format(item.date)} UTC` : null];
    const after = [formatDay(item.date)];
    const join = (when) => [label, ...when].filter(Boolean).join(" · ");
    return {
      kind: "video",
      label: item.title,
      url: item.url,
      note: join(upcoming ? before : after),
      noteAfter: upcoming ? join(after) : null,
      airs: upcoming ? item.date : null,
      image: item.image,
      source: item.source,
    };
  }

  // "Newsletter · October 1, 2026", so a mixed list says what each item is.
  const note = [label, item.date ? formatDay(item.date) : null].filter(Boolean).join(" · ");
  return {
    kind: "link",
    label: item.title,
    url: item.url,
    note: item.note ?? (note || null),
    image: section.images || hero ? imageFor(item, posts, siteUrl) : null,
    featured: false,
    source: item.source,
  };
}

function linkTile(item, posts, siteUrl) {
  return {
    kind: "link",
    label: item.label,
    url: item.url,
    image: imageFor(item, posts, siteUrl),
    featured: item.featured === true,
    source: "curated",
  };
}

// `image: auto` reuses what the site already does for social previews: a
// post's own og_image, or, for anything else, the Open Home Foundation
// Open Graph service that social_meta.html and crosspost_og.rb fall back to.
export function imageFor(item, posts, siteUrl) {
  const image = item.image;
  if (blank(image)) return null;
  if (image !== "auto") return image;

  let url = item.url;
  const pathname = url.startsWith(siteUrl) ? url.slice(siteUrl.length) : url;
  if (pathname.startsWith("/")) {
    const post = posts.find((candidate) => candidate.url === pathname);
    if (post && !blank(post.data.og_image)) return post.data.og_image;
    url = siteUrl + pathname;
  }
  return `${OG_ENDPOINT}?url=${encodeURIComponent(url)}`;
}

export function socialLinks(config) {
  return (config.socials ?? []).map((social) => ({ ...social, label: social.label ?? PLATFORMS[social.platform] }));
}
