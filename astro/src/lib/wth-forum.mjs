// Loads the WTH topics that scripts/fetch-wth-forum.mjs saves from the
// community forum, and picks the ones the hero should show: the
// community's most-backed WTHs, with titles that make sense on a card.
import fs from "node:fs";
import path from "node:path";

/** @returns {null | { fetched_at: string, url: string, top: any[], latest: any[] }} */
export function loadWthForum(root = path.resolve(process.cwd(), "..")) {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(root, "source/_data/wth_forum.json"), "utf8"));
    if (!Array.isArray(data?.top) || !Array.isArray(data?.latest)) return null;
    return data;
  } catch {
    return null;
  }
}

// What makes a topic worth showing in the hero: enough votes that the
// community has backed it, and a title long enough to say what the problem
// is ("Scene States" or "Naming things" don't, on a card of their own).
export const MIN_VOTES = 10;
export const MIN_TITLE_WORDS = 5;

const words = (text = "") => text.split(/\s+/).filter(Boolean).length;
export const isQualityTopic = (topic) => (topic.votes ?? 0) >= MIN_VOTES && words(topic.title) >= MIN_TITLE_WORDS;

/** Up to `count` topics, most-voted first, from those that pass
 *  isQualityTopic. If too few pass (early in the month), the rest are
 *  filled with the next most-voted topics that have a full title, so the
 *  hero still has its cards. */
export function pickWthTopics(data, count = 14) {
  if (!data) return [];
  const byId = new Map();
  for (const topic of [...data.top, ...data.latest]) if (!byId.has(topic.id)) byId.set(topic.id, topic);
  const ranked = [...byId.values()].sort((a, b) => (b.votes ?? 0) - (a.votes ?? 0) || (b.replies ?? 0) - (a.replies ?? 0));
  const picked = ranked.filter(isQualityTopic).slice(0, count);
  if (picked.length < count) {
    const extra = ranked.filter((t) => !isQualityTopic(t) && words(t.title) >= MIN_TITLE_WORDS);
    picked.push(...extra.slice(0, count - picked.length));
  }
  return picked;
}
