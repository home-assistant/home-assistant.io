// Loads the WTH topics that scripts/fetch-wth-forum.mjs saves from the
// community forum, and picks the ones a hero should show: the most-voted
// mixed with the newest, so it shows both the big asks and fresh voices.
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

const trim = (text, max) => {
  if (!text || text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:–-]+$/, "") + "…";
};

/** Up to `count` topics: alternately the next most-voted and the next
 *  newest, never the same topic twice, with excerpts trimmed to fit a card. */
export function pickWthTopics(data, count = 14) {
  if (!data) return [];
  const seen = new Set();
  const picked = [];
  const queues = [[...data.top], [...data.latest].filter((t) => t.excerpt)];
  for (let i = 0; picked.length < count && (queues[0].length || queues[1].length); i++) {
    const queue = queues[i % 3 === 2 ? 1 : 0].length ? queues[i % 3 === 2 ? 1 : 0] : queues[0].length ? queues[0] : queues[1];
    const topic = queue.shift();
    if (!topic || seen.has(topic.id)) continue;
    seen.add(topic.id);
    picked.push({ ...topic, excerpt: trim(topic.excerpt, 110) });
  }
  return picked;
}
