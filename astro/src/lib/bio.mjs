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
    parseTime(item.expires, `${itemPath}.expires`);
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
    parseTime(item.starts, `${itemPath}.starts`);
    parseTime(item.ends, `${itemPath}.ends`);
  });
}

// Items written straight into a feed. The date decides where each one
// sits, so it is required. A YouTube video takes its link and picture
// from the video, and its date from when it starts.
function validateInserts(inserts, keyPath) {
  if (!Array.isArray(inserts)) fail(keyPath, "must be a list of items");

  inserts.forEach((item, index) => {
    const itemPath = `${keyPath}[${index}]`;
    if (!isMap(item)) fail(itemPath, "must be a map with title, url and date");
    if (blank(item.title)) fail(`${itemPath}.title`, "is required");
    if (has(item, "label") && blank(item.label)) fail(`${itemPath}.label`, "must be text, e.g. Event");

    if (item.type === "youtube") {
      if (!youtubeId(item.video)) {
        fail(`${itemPath}.video`, "must be a YouTube video ID or link, e.g. https://www.youtube.com/watch?v=XyAL1to3Lm4");
      }
      if (blank(item.start)) fail(`${itemPath}.start`, "is required, e.g. 2026-11-15T18:00:00Z");
      parseTime(item.start, `${itemPath}.start`);
      return;
    }
    if (has(item, "type")) fail(`${itemPath}.type`, "must be youtube, or left out for a plain link");

    requireUrl(item, itemPath);
    if (blank(item.date)) fail(`${itemPath}.date`, "is required, e.g. 2026-11-01");
    parseTime(item.date, `${itemPath}.date`);
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
export function resolve(config, posts, now, siteUrl, data = {}) {
  const sources = config.sources ?? {};
  const newestFirst = [...posts].sort((a, b) => b.date - a.date);
  const sections = config.sections ?? [];
  const feedItems = claimFeedItems(sections, sources, newestFirst, now, data);

  return sections.flatMap((section, index) => {
    const tiles =
      section.type === "feed"
        ? (feedItems.get(index) ?? []).map((item, position) =>
            feedTile(item, section, sources, newestFirst, siteUrl, now, section.hero === true && position === 0),
          )
        : section.items.filter((item) => inWindow(item, now)).map((item) => linkTile(item, newestFirst, siteUrl));

    if (tiles.length === 0) return [];

    // The first item becomes a large card with its image on top. Without an
    // image it stays a normal tile rather than a card with a hole. A video
    // already is a large card.
    if (section.hero === true && tiles[0].image && tiles[0].kind === "link") tiles[0].kind = "hero";

    return [{ title: section.title, type: section.type, tiles }];
  });
}

// On release day the release post is also the newest blog post. It should
// appear once, under the section that describes it best: a pin first,
// then a category feed such as releases, and only then the general blog,
// which backfills with its next post. Sections still render in YAML order.
function claimFeedItems(sections, sources, posts, now, data) {
  const candidates = sections.flatMap((section, index) =>
    section.type === "feed" ? [[index, section, mergedItems(section, sources, posts, now, data)]] : [],
  );

  const claimed = new Set();
  const result = new Map();
  candidates
    .sort(([indexA, , itemsA], [indexB, , itemsB]) => specificity(itemsB, sources) - specificity(itemsA, sources) || indexA - indexB)
    .forEach(([index, section, items]) => {
      const taken = items.filter((item) => !claimed.has(item.url)).slice(0, section.limit ?? 1);
      taken.forEach((item) => claimed.add(item.url));
      result.set(index, taken);
    });
  return result;
}

// Everything a feed section's sources produce, as one list: an active pin
// first, because someone chose it, then the rest newest first, whichever
// feed they came from. A source's `limit` caps how many of its items can
// take part, so one busy feed can't crowd out the others.
function mergedItems(section, sources, posts, now, data) {
  // Pins go first before duplicates are dropped, so a pin of a post that
  // is also in the blog keeps its place and title whatever the order of
  // `sources`.
  const isPinned = (item) => (sources[item.source]?.type === "pinned" ? 1 : 0);
  const all = [
    ...sectionSources(section).flatMap((name) => resolveSource(name, sources, posts, now, data)),
    ...insertedItems(section),
  ].sort((a, b) => isPinned(b) - isPinned(a));

  const taken = new Map();
  const seenUrls = new Set();
  const items = all.filter((item) => {
    const cap = sources[item.source]?.limit;
    const count = taken.get(item.source) ?? 0;
    if (cap && count >= cap) return false;
    taken.set(item.source, count + 1);
    if (seenUrls.has(item.url)) return false;
    seenUrls.add(item.url);
    return true;
  });

  const pinned = items.filter((item) => sources[item.source]?.type === "pinned");
  const dated = items
    .filter((item) => sources[item.source]?.type !== "pinned")
    .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));
  return [...pinned, ...dated];
}

// `insert:` entries on a feed section. They have no source of their own,
// so they carry their own label and take their place by date.
function insertedItems(section) {
  return (section.insert ?? []).map((item) => {
    if (item.type === "youtube") {
      const id = youtubeId(item.video);
      return {
        title: item.title,
        url: `https://www.youtube.com/watch?v=${id}`,
        date: parseTime(item.start, "insert"),
        timed: hasTime(item.start),
        image: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        label: item.label,
        video: true,
        source: "inserted",
      };
    }
    return {
      title: item.title,
      url: item.url,
      date: parseTime(item.date, "insert"),
      image: item.image,
      label: item.label,
      source: "inserted",
    };
  });
}

// Which source actually produced the items: a pin may have fallen back.
function specificity(items, sources) {
  const source = sources[items[0]?.source];
  if (!source) return 0;
  if (source.type === "pinned") return 2;
  return source.category ? 1 : 0;
}

function resolveSource(name, sources, posts, now, data = {}, seen = []) {
  const source = sources[name];
  if (!source || seen.includes(name)) return [];

  let items = [];
  if (source.type === "posts") items = postsFor(source, posts, name);
  else if (source.type === "data") items = dataItems(data[source.file], name);
  else if (source.type === "pinned") {
    items = (source.items ?? [])
      .filter((item) => {
        const expires = parseTime(item.expires, name);
        return !(expires && expires <= now);
      })
      .map((item) => ({ ...item, source: name }));
  }

  // An expired or empty pin is not an error: it means "back to the feed".
  if (items.length === 0 && source.fallback) return resolveSource(source.fallback, sources, posts, now, data, [...seen, name]);

  return items;
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
    // Before it starts: "Livestream · Starts November 15 · 18:00 UTC".
    const upcoming = item.date > now;
    const when = upcoming
      ? ["Starts " + DAY_NO_YEAR.format(item.date), item.timed ? `${TIME.format(item.date)} UTC` : null]
      : [formatDay(item.date)];
    return {
      kind: "video",
      label: item.title,
      url: item.url,
      note: [label, ...when].filter(Boolean).join(" · "),
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

function inWindow(item, now) {
  const starts = parseTime(item.starts, "starts");
  const ends = parseTime(item.ends, "ends");
  return (!starts || starts <= now) && (!ends || ends > now);
}

export function socialLinks(config) {
  return (config.socials ?? []).map((social) => ({ ...social, label: social.label ?? PLATFORMS[social.platform] }));
}
