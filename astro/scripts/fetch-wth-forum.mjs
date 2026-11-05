#!/usr/bin/env node
// Fetches WTH topics from the community forum's Month of "What the Heck?!"
// category and writes them to source/_data/wth_forum.json, next to the
// wth_stats.json the rake task writes. Run it before `astro build`:
//
//   node scripts/fetch-wth-forum.mjs
//
// It uses Discourse's public JSON (no API key): the category's top topics
// this month, by votes, plus its latest topics, so the hero shows both the
// big ones and fresh ones. On any failure it leaves the previous file alone
// and exits 0, so a forum hiccup never breaks the site build.
//
// The file is committed, so a build where the forum can't be reached (for
// example when Cloudflare turns away the build server) still shows real
// topics from the last snapshot instead of the page's example WTHs. Run the
// script and commit the result to refresh the snapshot.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FORUM = "https://community.home-assistant.io";
const CATEGORY = "c/month-of-what-the-heck/64";
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../source/_data/wth_forum.json");
// Discourse sits behind Cloudflare, which turns away anonymous-looking
// clients; a named user agent gets the JSON.
const HEADERS = { Accept: "application/json", "User-Agent": "HomeAssistantSiteBuild/1.0 (+https://www.home-assistant.io)" };

const ENTITIES = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "’", "&rsquo;": "’", "&lsquo;": "‘", "&ldquo;": "“", "&rdquo;": "”", "&hellip;": "…", "&nbsp;": " " };
const clean = (s = "") => s.replace(/<[^>]+>/g, "").replace(/&[#\w]+;/g, (e) => ENTITIES[e] ?? e).replace(/\s+/g, " ").trim();

async function list(route) {
  const res = await fetch(`${FORUM}/${CATEGORY}/l/${route}`, { headers: HEADERS });
  if (!res.ok) throw new Error(`${route}: HTTP ${res.status}`);
  return res.json();
}

function topics(data) {
  const users = new Map((data.users ?? []).map((u) => [u.id, u]));
  return (data.topic_list?.topics ?? [])
    .filter((t) => !t.pinned && t.visible && !t.closed && !/^About the /.test(t.title))
    .map((t) => {
      const op = (t.posters ?? []).find((p) => /Original Poster/.test(p.description ?? "")) ?? t.posters?.[0];
      const user = op ? users.get(op.user_id) : undefined;
      const title = clean(t.fancy_title || t.title);
      let excerpt = clean(t.excerpt);
      if (excerpt.toLowerCase().startsWith(title.toLowerCase())) excerpt = excerpt.slice(title.length).trim();
      return {
        id: t.id,
        title,
        excerpt,
        url: `${FORUM}/t/${t.slug}/${t.id}`,
        votes: t.vote_count ?? 0,
        likes: t.like_count ?? 0,
        replies: Math.max(0, (t.posts_count ?? 1) - 1),
        author: user?.username ?? null,
        avatar: user ? `${user.avatar_template.startsWith("http") ? "" : FORUM}${user.avatar_template.replace("{size}", "96")}` : null,
        created_at: t.created_at,
        tags: (t.tags ?? []).map((tag) => (typeof tag === "string" ? tag : tag.name)),
      };
    });
}

try {
  const [top, latest] = await Promise.all([list("top.json?period=monthly"), list("latest.json")]);
  const topTopics = topics(top).sort((a, b) => b.votes - a.votes);
  const latestTopics = topics(latest);
  const out = {
    fetched_at: new Date().toISOString(),
    url: `${FORUM}/${CATEGORY}`,
    total: top.topic_list?.topics?.length ?? null,
    top: topTopics.slice(0, 40),
    latest: latestTopics.slice(0, 30),
  };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
  console.log(`wth_forum.json: ${out.top.length} top, ${out.latest.length} latest`);
} catch (error) {
  console.warn(`wth_forum.json not updated: ${error.message}`);
}
