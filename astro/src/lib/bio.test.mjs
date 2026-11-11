// Tests for the bio page logic (src/lib/bio.mjs). Run with `npm test` in
// astro/ (node's built-in test runner, no dependencies).
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import { BioConfigError, dataItems, imageFor, loadPosts, parseEnd, resolve, validate, withHeroTaken, youtubeId } from "./bio.mjs";
import { isShowing, select } from "./bio-schedule.mjs";

const NOW = new Date("2026-10-22T00:00:00Z");
const SITE = "https://www.home-assistant.io";

const POSTS = [
  {
    url: "/blog/2026/10/01/release-202610/",
    date: new Date("2026-10-01T00:00:00Z"),
    data: { title: "2026.10", categories: ["Release-Notes", "Core"], og_image: "/images/blog/2026-10/social.jpg" },
  },
  {
    url: "/blog/2026/10/14/voice/",
    date: new Date("2026-10-14T00:00:00Z"),
    data: { title: "Voice", categories: ["Voice"], og_image: "/images/voice.jpg" },
  },
];

const NEWSLETTER = [
  { title: "Older issue", url: "https://newsletter.example/older/", date: "2026-09-01T09:00:00Z", image: "https://newsletter.example/older.png" },
  { title: "Latest issue", url: "https://newsletter.example/latest/", date: "2026-10-01T09:00:00Z", image: "https://newsletter.example/latest.png" },
  { title: "", url: "https://newsletter.example/broken/" },
];

const config = (overrides = {}) => ({
  sections: [{ type: "feed", source: "latest", limit: 1 }],
  sources: {
    blog: { type: "posts" },
    latest: { type: "pinned", items: [], fallback: "blog" },
  },
  ...overrides,
});

const labels = (cfg, data = {}, posts = POSTS) =>
  resolve(cfg, posts, NOW, SITE, data).flatMap((section) => section.tiles.map((tile) => tile.label));

// What the script on the page shows at `at`, from what the build rendered:
// the labels showing in each section, by title.
const showingAt = (sections, at) => {
  const ordered = [...sections].sort((a, b) => a.order - b.order);
  const picks = select(ordered, new Date(at));
  return Object.fromEntries(ordered.map((s, i) => [s.title ?? "", s.entries.filter((e) => isShowing(e, picks[i])).map((e) => e.label)]));
};

const titled = (sections) => Object.fromEntries(sections.map((s) => [s.title, s.tiles.map((t) => t.label)]));

function assertInvalid(cfg, message) {
  assert.throws(() => validate(cfg), (error) => error instanceof BioConfigError && error.message.includes(message));
}

describe("validation: an editing mistake names the line", () => {
  it("accepts a valid config", () => assert.equal(validate(config()), true));

  it("names the declared sources for an unknown one", () =>
    assertInvalid(
      config({ sections: [{ type: "feed", source: "lastest" }] }),
      'sections[0].source: unknown source "lastest". Declared: blog, latest',
    ));

  it("rejects an unknown section type", () =>
    assertInvalid(config({ sections: [{ type: "link" }] }), "sections[0].type: must be one of: links, feed"));

  it("rejects a date that isn't YYYY-MM-DD", () =>
    assertInvalid(
      config({ sections: [{ type: "links", items: [{ label: "x", url: "/x/", ends: "31/11/2026" }] }] }),
      'sections[0].items[0].ends: "31/11/2026" is not a date',
    ));

  it("rejects a relative link without a slash", () =>
    assertInvalid(
      config({ sections: [{ type: "links", items: [{ label: "x", url: "docs" }] }] }),
      "sections[0].items[0].url: must be a site path",
    ));

  it("catches a fallback loop", () =>
    assertInvalid(
      config({
        sources: {
          a: { type: "pinned", fallback: "b" },
          b: { type: "pinned", fallback: "a" },
          latest: { type: "posts" },
        },
      }),
      "fallback loop: a → b → a",
    ));

  it("rejects a limit out of range", () =>
    assertInvalid(
      config({ sections: [{ type: "feed", source: "blog", limit: 0 }] }),
      "sections[0].limit: must be a whole number from 1 to 10",
    ));

  it("requires a file name for a data source", () =>
    assertInvalid(config({ sources: { latest: { type: "data", file: "../secrets" } } }), "sources.latest.file: must name a data file"));
});

describe("pins", () => {
  it("falls back to the newest post when empty", () => assert.deepEqual(labels(config()), ["Voice"]));

  it("wins while active", () => {
    const cfg = config();
    cfg.sources.latest.items = [{ title: "Launch", url: "/launch/", ends: "2026-11-01" }];
    assert.deepEqual(labels(cfg), ["Launch"]);
  });

  it("hands back to the feed once expired", () => {
    const cfg = config();
    cfg.sources.latest.items = [{ title: "Launch", url: "/launch/", ends: "2026-10-01" }];
    assert.deepEqual(labels(cfg), ["Voice"]);
  });
});

describe("sources and scheduling", () => {
  it("filters by category", () => {
    const cfg = config({
      sections: [{ type: "feed", source: "releases" }],
      sources: { releases: { type: "posts", category: "Release-Notes" } },
    });
    assert.deepEqual(labels(cfg), ["2026.10"]);
  });

  it("shows a link only inside its window", () => {
    const cfg = config({
      sections: [
        {
          type: "links",
          items: [
            { label: "Running", url: "/a/", starts: "2026-10-01", ends: "2026-11-01" },
            { label: "Not yet", url: "/b/", starts: "2026-11-01" },
            { label: "Over", url: "/c/", ends: "2026-10-01" },
          ],
        },
      ],
    });
    assert.deepEqual(labels(cfg), ["Running"]);
  });

  it("leaves out an empty section", () => {
    const cfg = config({ sections: [{ type: "links", title: "Gone", items: [{ label: "Over", url: "/c/", ends: "2026-01-01" }] }] });
    assert.deepEqual(resolve(cfg, POSTS, NOW, SITE), []);
  });
});

describe("release day", () => {
  const releaseDay = (order) => {
    const posts = [{ ...POSTS[0], date: new Date("2026-10-20T00:00:00Z") }, POSTS[1]];
    const sections = {
      blog: { type: "feed", title: "Blog", source: "blog", limit: 1 },
      releases: { type: "feed", title: "Release", source: "releases", limit: 1 },
    };
    const cfg = config({
      sections: order.map((key) => sections[key]),
      sources: { blog: { type: "posts" }, releases: { type: "posts", category: "Release-Notes" } },
    });
    return titled(resolve(cfg, posts, NOW, SITE));
  };

  it("keeps the release post under releases when blog is first", () =>
    assert.deepEqual(releaseDay(["blog", "releases"]), { Blog: ["Voice"], Release: ["2026.10"] }));

  it("keeps the release post under releases when releases is first", () =>
    assert.deepEqual(releaseDay(["releases", "blog"]), { Release: ["2026.10"], Blog: ["Voice"] }));

  it("lets a pin outrank a category feed", () => {
    const cfg = config({
      sections: [
        { type: "feed", title: "Release", source: "releases" },
        { type: "feed", title: "Pinned", source: "latest" },
      ],
      sources: {
        releases: { type: "posts", category: "Release-Notes" },
        latest: { type: "pinned", items: [{ title: "Pinned release", url: "/blog/2026/10/01/release-202610/" }] },
      },
    });
    assert.deepEqual(titled(resolve(cfg, POSTS, NOW, SITE)), { Pinned: ["Pinned release"] });
  });
});

describe("downloaded data (the newsletter)", () => {
  const newsletterConfig = () =>
    config({
      sections: [{ type: "feed", source: "newsletter", limit: 1, images: true }],
      sources: { newsletter: { type: "data", file: "newsletter" } },
    });

  it("shows the newest issue with its image", () => {
    const tile = resolve(newsletterConfig(), POSTS, NOW, SITE, { newsletter: NEWSLETTER })[0].tiles[0];
    assert.equal(tile.label, "Latest issue");
    assert.equal(tile.image, "https://newsletter.example/latest.png");
    assert.equal(tile.note, "October 1, 2026");
  });

  it("leaves the section out when the data is missing, empty or malformed", () => {
    for (const data of [{}, { newsletter: [] }, { newsletter: "not a list" }]) {
      assert.deepEqual(resolve(newsletterConfig(), POSTS, NOW, SITE, data), []);
    }
  });

  it("skips entries without a link", () => {
    assert.deepEqual(dataItems([{ title: "No link" }, ...NEWSLETTER], "n").map((item) => item.title), ["Latest issue", "Older issue"]);
  });
});

const mergedConfig = (section = {}, sources = {}) => ({
  sections: [{ type: "feed", title: "Latest", sources: ["pinned", "blog", "newsletter"], limit: 3, ...section }],
  sources: {
    pinned: { type: "pinned", items: [] },
    blog: { type: "posts", label: "Blog" },
    newsletter: { type: "data", file: "newsletter", label: "Newsletter", limit: 1 },
    ...sources,
  },
});

const merged = (cfg, data = { newsletter: NEWSLETTER }) => {
  validate(cfg);
  return resolve(cfg, POSTS, NOW, SITE, data)[0].tiles.map((tile) => [tile.label, tile.note]);
};

describe("merged lists", () => {
  it("orders items newest first across feeds", () =>
    assert.deepEqual(merged(mergedConfig()), [
      ["Voice", "Blog · October 14, 2026"],
      ["Latest issue", "Newsletter · October 1, 2026"],
      ["2026.10", "Blog · October 1, 2026"],
    ]));

  it("caps each source at its limit", () =>
    assert.deepEqual(merged(mergedConfig({ limit: 10 })).map(([label]) => label), ["Voice", "Latest issue", "2026.10"]));

  it("puts a pin first and continues with the feeds", () => {
    const cfg = mergedConfig({}, { pinned: { type: "pinned", items: [{ title: "Launch", url: "/launch/" }] } });
    assert.deepEqual(merged(cfg).map(([label]) => label), ["Launch", "Voice", "Latest issue"]);
  });

  it("doesn't repeat a pinned post from the blog", () => {
    const cfg = mergedConfig({}, { pinned: { type: "pinned", items: [{ title: "Voice", url: "/blog/2026/10/14/voice/" }] } });
    assert.deepEqual(merged(cfg).map(([label]) => label), ["Voice", "Latest issue", "2026.10"]);
  });

  it("keeps a pinned blog post first when blog is listed first", () => {
    const cfg = mergedConfig(
      { sources: ["blog", "pinned"], limit: 1 },
      { pinned: { type: "pinned", items: [{ title: "Release party", url: "/blog/2026/10/01/release-202610/" }] } },
    );
    assert.deepEqual(merged(cfg).map(([label]) => label), ["Release party"]);
  });

  it("excludes a category", () => {
    const cfg = mergedConfig({}, { blog: { type: "posts", label: "Blog", exclude_category: "Release-Notes" } });
    assert.deepEqual(merged(cfg).map(([label]) => label), ["Voice", "Latest issue"]);
  });

  it("still shows the blog without the newsletter", () =>
    assert.deepEqual(merged(mergedConfig(), {}).map(([label]) => label), ["Voice", "2026.10"]));

  it("needs either source or sources", () => assertInvalid(mergedConfig({ source: "blog" }), "sections[0]: needs either source"));

  it("names an unknown source in a list", () =>
    assertInvalid(mergedConfig({ sources: ["blog", "newletter"] }), 'sections[0].sources: unknown source "newletter"'));

  it("allows exclude_category only on posts", () =>
    assertInvalid(
      mergedConfig({}, { newsletter: { type: "data", file: "newsletter", exclude_category: "x" } }),
      "sources.newsletter.exclude_category: only works on sources of type posts",
    ));

  it("checks a source's limit", () =>
    assertInvalid(
      mergedConfig({}, { newsletter: { type: "data", file: "newsletter", limit: 0 } }),
      "sources.newsletter.limit: must be a whole number from 1 to 10",
    ));
});

describe("inserted items", () => {
  it("take their place by date", () =>
    assert.deepEqual(
      merged(mergedConfig({ limit: 10, insert: [{ title: "Community Day", url: "https://example.test/day/", starts: "2026-10-10", label: "Event" }] })),
      [
        ["Voice", "Blog · October 14, 2026"],
        ["Community Day", "Event · October 10, 2026"],
        ["Latest issue", "Newsletter · October 1, 2026"],
        ["2026.10", "Blog · October 1, 2026"],
      ],
    ));

  it("become the hero when newest", () => {
    const cfg = mergedConfig({ hero: true, insert: [{ title: "Launch", url: "https://example.test/launch/", starts: "2026-10-20", image: "auto" }] });
    const tile = resolve(cfg, POSTS, NOW, SITE, { newsletter: NEWSLETTER })[0].tiles[0];
    assert.equal(tile.label, "Launch");
    assert.equal(tile.kind, "hero");
    assert.ok(tile.image.includes("assets.openhomefoundation.org/opengraph"));
  });

  it("need starts", () => assertInvalid(mergedConfig({ insert: [{ title: "Undated", url: "/x/" }] }), "sections[0].insert[0].starts: is required"));

  it("come in at the top when a future starts passes", () => {
    const cfg = mergedConfig({ insert: [{ title: "Scheduled", url: "/s/", starts: "2026-10-30" }] });
    validate(cfg);
    const sections = resolve(cfg, POSTS, NOW, SITE, { newsletter: NEWSLETTER });
    const { entries } = sections[0];
    assert.equal(entries[0].label, "Scheduled");
    assert.equal(entries[0].hidden, true);
    assert.deepEqual(showingAt(sections, "2026-10-31T00:00:00Z").Latest, ["Scheduled", "Voice", "Latest issue"]);
  });

  it("need a valid starts", () =>
    assertInvalid(mergedConfig({ insert: [{ title: "Bad", url: "/x/", starts: "10/11/2026" }] }), 'sections[0].insert[0].starts: "10/11/2026" is not a date'));

  it("name the new key for a renamed one", () => {
    assertInvalid(mergedConfig({ insert: [{ title: "Old", url: "/o/", date: "2026-10-01" }] }), "sections[0].insert[0].date: is now called starts");
    assertInvalid(mergedConfig({ insert: [{ title: "Old", url: "/o/", start: "2026-10-01" }] }), "sections[0].insert[0].start: is now called starts");
  });
});

describe("YouTube inserts", () => {
  const video = (overrides = {}) => ({
    type: "youtube",
    video: "https://www.youtube.com/watch?v=XyAL1to3Lm4",
    title: "State of the Open Home",
    airs: "2026-11-15T18:00:00Z",
    label: "Livestream",
    ...overrides,
  });
  const tiles = (insert, now = NOW) => {
    const cfg = mergedConfig({ hero: true, limit: 10, insert });
    validate(cfg);
    return resolve(cfg, POSTS, now, SITE, { newsletter: NEWSLETTER })[0].tiles;
  };

  it("reads IDs from the usual links", () => {
    for (const value of [
      "XyAL1to3Lm4",
      "https://www.youtube.com/watch?v=XyAL1to3Lm4&t=10s",
      "https://youtu.be/XyAL1to3Lm4",
      "https://www.youtube.com/live/XyAL1to3Lm4",
      "https://m.youtube.com/shorts/XyAL1to3Lm4",
    ]) {
      assert.equal(youtubeId(value), "XyAL1to3Lm4", value);
    }
    assert.equal(youtubeId("https://example.com/watch?v=XyAL1to3Lm4"), null);
  });

  it("shows an upcoming stream with its start time in UTC", () => {
    const [first] = tiles([video()]);
    assert.equal(first.kind, "video");
    assert.equal(first.url, "https://www.youtube.com/watch?v=XyAL1to3Lm4");
    assert.equal(first.image, "https://i.ytimg.com/vi/XyAL1to3Lm4/hqdefault.jpg");
    assert.equal(first.note, "Livestream · Starts November 15 · 18:00 UTC");
  });

  it("leaves the time out when only a day is given", () =>
    assert.equal(tiles([video({ airs: "2026-11-15" })])[0].note, "Livestream · Starts November 15"));

  it("carries the note to show once it has started", () => {
    const [entry] = resolve(mergedConfig({ hero: true, insert: [video()] }), POSTS, NOW, SITE, {})[0].entries;
    assert.equal(entry.noteAfter, "Livestream · November 15, 2026");
    assert.equal(entry.airs.toISOString(), "2026-11-15T18:00:00.000Z");
  });

  it("shows the date once it has started, in date order", () => {
    const list = tiles([video({ airs: "2026-10-10T18:00:00Z", ends: "2026-12-01" })]);
    assert.deepEqual(
      list.map((tile) => tile.label),
      ["Voice", "State of the Open Home", "Latest issue", "2026.10"],
    );
    assert.equal(list[1].note, "Livestream · October 10, 2026");
    assert.equal(list[1].kind, "video");
  });

  it("needs a recognizable video", () =>
    assertInvalid(mergedConfig({ insert: [video({ video: "not a video" })] }), "sections[0].insert[0].video: must be a YouTube video ID or link"));

  it("needs airs", () =>
    assertInvalid(mergedConfig({ insert: [video({ airs: undefined })] }), "sections[0].insert[0].airs: is required"));

  it("names airs for start or date", () => {
    assertInvalid(mergedConfig({ insert: [video({ airs: undefined, start: "2026-11-15" })] }), "sections[0].insert[0].start: is now called airs");
    assertInvalid(mergedConfig({ insert: [video({ date: "2026-11-15" })] }), "sections[0].insert[0].date: is now called airs");
  });

  it("can show before it airs", () => {
    const [entry] = resolve(mergedConfig({ insert: [video({ starts: "2026-11-12" })] }), POSTS, NOW, SITE, {})[0].entries;
    assert.equal(entry.label, "State of the Open Home");
    assert.equal(entry.starts.toISOString(), "2026-11-12T00:00:00.000Z");
  });

  it("comes down at the end of the day after it airs", () => {
    const [entry] = tiles([video({ airs: "2026-10-20T18:00:00Z" })], new Date("2026-10-21T23:00:00Z"));
    assert.equal(entry.label, "State of the Open Home");
    assert.equal(entry.ends.toISOString(), "2026-10-22T00:00:00.000Z");
    assert.ok(!tiles([video({ airs: "2026-10-20T18:00:00Z" })]).some((t) => t.label === "State of the Open Home"));
  });

  it("rejects an unknown insert type", () =>
    assertInvalid(mergedConfig({ insert: [video({ type: "vimeo" })] }), "sections[0].insert[0].type: must be youtube"));
});

describe("hero card", () => {
  const heroTiles = (section = {}, sources = {}) => {
    const cfg = mergedConfig({ hero: true, ...section }, sources);
    validate(cfg);
    return resolve(cfg, POSTS, NOW, SITE, { newsletter: NEWSLETTER })[0].tiles;
  };

  it("makes the first item the hero with its image", () => {
    const tiles = heroTiles();
    assert.equal(tiles[0].kind, "hero");
    assert.equal(tiles[0].image, "/images/voice.jpg");
    assert.equal(tiles[1].kind, "link");
  });

  it("gives the hero its image even without thumbnails", () => {
    const tiles = heroTiles({ images: false });
    assert.equal(tiles[0].kind, "hero");
    assert.equal(tiles[1].image, null);
  });

  it("keeps a first item without an image as a normal tile", () => {
    const tiles = heroTiles({}, { pinned: { type: "pinned", items: [{ title: "No picture", url: "/launch/" }] } });
    assert.equal(tiles[0].label, "No picture");
    assert.equal(tiles[0].kind, "link");
  });

  it("must be true or false", () => assertInvalid(mergedConfig({ hero: "yes" }), "sections[0].hero: must be true or false"));

  describe("with a livestream card", () => {
    const latest = () => {
      const cfg = mergedConfig({ hero: true, livestream: "home-assistant" });
      validate(cfg);
      return resolve(cfg, POSTS, NOW, SITE, { newsletter: NEWSLETTER })[0];
    };

    it("passes the channel to the page", () => assert.equal(latest().livestream, "home-assistant"));

    it("gives the first item a row version too, shown when the card takes the large place", () => {
      const { entries } = latest();
      const keys = entries.filter((e) => !e.hidden).map((e) => e.key);
      const showing = (taken) => entries.filter((e) => isShowing(e, keys, taken)).map((e) => [e.label, e.kind]);
      assert.deepEqual(showing(false)[0], ["Voice", "hero"]);
      assert.deepEqual(showing(true)[0], ["Voice", "link"]);
      assert.equal(showing(true).filter(([label]) => label === "Voice").length, 1);
    });

    it("builds the first item as a row when the card is known at build time", () => {
      const taken = withHeroTaken(latest());
      assert.equal(taken.heroTaken, true);
      assert.deepEqual(taken.tiles[0] && [taken.tiles[0].label, taken.tiles[0].kind], ["Voice", "link"]);
      assert.equal(taken.tiles.filter((t) => t.label === "Voice").length, 1);
    });

    it("must name a channel", () =>
      assertInvalid(mergedConfig({ livestream: "Home Assistant" }), "sections[0].livestream: must be a livestream channel name"));

    it("only works on a feed", () =>
      assertInvalid(
        config({ sections: [{ type: "links", livestream: "home-assistant", items: [] }] }),
        "sections[0].livestream: only works on a feed section",
      ));
  });
});

describe("images", () => {
  it("uses a post's own og_image for auto", () =>
    assert.equal(imageFor({ url: "/blog/2026/10/14/voice/", image: "auto" }, POSTS, SITE), "/images/voice.jpg"));

  it("uses the Open Graph service for other links", () =>
    assert.equal(
      imageFor({ url: "https://www.openhomefoundation.org/survey/", image: "auto" }, POSTS, SITE),
      "https://assets.openhomefoundation.org/opengraph?url=https%3A%2F%2Fwww.openhomefoundation.org%2Fsurvey%2F",
    ));
});

describe("reading posts", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bio-posts-"));
  const write = (name, frontMatter) => fs.writeFileSync(path.join(dir, name), `---\n${frontMatter}\n---\nBody.\n`);
  write("2026-10-01-release-202610.markdown", 'title: "2026.10: You are \\"here\\""\ndate: 2026-10-01 00:00:00\ncategories:\n  - Release-Notes\n  - Core\nog_image: /images/blog/2026-10/social.jpg');
  write("2026-10-20-crosspost.markdown", "title: 'Open home'\ndate: 2026-10-20 00:00:00\ncategories: [Announcements]\nexternal_url: https://www.openhomefoundation.org/blog/open-home/");
  write("2026-10-15-podcast.markdown", 'title: "Podcast #10" # comment\ndate: 2026-10-15 00:00:00\ncategories: Announcements Media');
  write("2026-10-21-draft.markdown", "title: Draft\npublished: false");
  write("2026-12-01-future.markdown", "title: Future\ndate: 2026-12-01 00:00:00");
  const posts = loadPosts(dir, NOW);
  const byTitle = Object.fromEntries(posts.map((post) => [post.data.title, post]));

  it("reads titles, URLs, categories and images", () => {
    const release = byTitle['2026.10: You are "here"'];
    assert.equal(release.url, "/blog/2026/10/01/release-202610/");
    assert.deepEqual(release.data.categories, ["Release-Notes", "Core"]);
    assert.equal(release.data.og_image, "/images/blog/2026-10/social.jpg");
  });

  it("keeps a # inside a quoted title", () => assert.ok(byTitle["Podcast #10"]));

  it("splits space-separated categories, as Jekyll does", () =>
    assert.deepEqual(byTitle["Podcast #10"].data.categories, ["Announcements", "Media"]));

  it("gives a crosspost the Open Graph image of its article", () =>
    assert.equal(
      byTitle["Open home"].data.og_image,
      "https://assets.openhomefoundation.org/opengraph?url=https://www.openhomefoundation.org/blog/open-home/",
    ));

  it("leaves out unpublished and future posts, as Jekyll does", () =>
    assert.deepEqual(Object.keys(byTitle).sort(), ['2026.10: You are "here"', "Open home", "Podcast #10"]));
});

describe("scheduled items", () => {
  const insert = (overrides = {}) => ({ title: "AUX2 livestream", url: "https://example.test/live/", starts: "2026-10-21", ...overrides });
  const section = (cfg) => {
    validate(cfg);
    return resolve(cfg, POSTS, NOW, SITE, { newsletter: NEWSLETTER })[0];
  };

  it("keeps a day-only ends up through that day", () => {
    assert.equal(parseEnd("2026-11-15", "x").toISOString(), "2026-11-16T00:00:00.000Z");
    assert.equal(parseEnd("2026-11-15T18:00:00Z", "x").toISOString(), "2026-11-15T18:00:00.000Z");
  });

  it("renders a future insert hidden, ready for the script", () => {
    const { tiles, entries } = section(mergedConfig({ insert: [insert({ starts: "2026-10-23T18:00:00Z" })] }));
    assert.deepEqual(tiles.map((t) => t.label), ["Voice", "Latest issue", "2026.10"]);
    const live = entries.find((e) => e.label === "AUX2 livestream");
    assert.equal(live.hidden, true);
    assert.equal(live.starts.toISOString(), "2026-10-23T18:00:00.000Z");
  });

  it("shows an insert inside its window and leaves it out once ended", () => {
    const running = section(mergedConfig({ insert: [insert({ starts: "2026-10-21", ends: "2026-10-22" })] }));
    assert.equal(running.tiles[0].label, "AUX2 livestream");
    const ended = section(mergedConfig({ insert: [insert({ starts: "2026-10-19", ends: "2026-10-20" })] }));
    assert.ok(!ended.entries.some((e) => e.label === "AUX2 livestream"));
  });

  it("renders the item that moves up when a scheduled one ends", () => {
    const latest = section(mergedConfig({ insert: [insert({ ends: "2026-10-23T12:00:00Z" })] }));
    const { entries } = latest;
    // limit 3: the insert and 3 items that always show.
    assert.deepEqual(entries.map((e) => [e.label, e.hidden]), [
      ["AUX2 livestream", false],
      ["Voice", false],
      ["Latest issue", false],
      ["2026.10", true],
    ]);
    assert.deepEqual(showingAt([latest], "2026-10-23T13:00:00Z").Latest, ["Voice", "Latest issue", "2026.10"]);
  });

  it("gives an item that might come first a hero and a row version", () => {
    const latest = section(mergedConfig({ hero: true, insert: [insert({ ends: "2026-10-23", image: "auto" })] }));
    const { entries } = latest;
    assert.deepEqual(entries.slice(0, 3).map((e) => [e.label, e.kind, e.variant ?? null, e.hidden]), [
      ["AUX2 livestream", "hero", null, false],
      ["Voice", "hero", "hero", true],
      ["Voice", "link", "row", false],
    ]);
    const keys = select([latest], new Date("2026-10-25T00:00:00Z"))[0];
    assert.deepEqual(entries.filter((e) => isShowing(e, keys)).map((e) => [e.label, e.kind]), [
      ["Voice", "hero"],
      ["Latest issue", "link"],
      ["2026.10", "link"],
    ]);
  });

  it("pins can start and end", () => {
    const pin = (item) => mergedConfig({}, { pinned: { type: "pinned", items: [{ title: "Launch", url: "/launch/", ...item }] } });
    assert.equal(section(pin({ starts: "2026-10-23" })).tiles[0].label, "Voice");
    assert.equal(section(pin({ ends: "2026-10-23" })).tiles[0].label, "Launch");
    assert.equal(section(pin({})).tiles[0].label, "Launch");
  });

  it("brings a section in hidden when its only link starts later", () => {
    const cfg = config({ sections: [{ type: "links", title: "Soon", items: [{ label: "Tickets", url: "/t/", starts: "2026-11-01" }] }] });
    const [soon] = resolve(cfg, POSTS, NOW, SITE);
    assert.equal(soon.hidden, true);
    assert.equal(soon.entries[0].hidden, true);
  });

  it("rejects ends before starts", () =>
    assertInvalid(mergedConfig({ insert: [insert({ starts: "2026-11-02", ends: "2026-11-01" })] }), "sections[0].insert[0].ends: must be after starts"));

  it("names ends for expires", () =>
    assertInvalid(
      mergedConfig({}, { pinned: { type: "pinned", items: [{ title: "x", url: "/x/", expires: "2026-11-01" }] } }),
      "sources.pinned.items[0].expires: is now called ends",
    ));
});

describe("items that depend on which others are up", () => {
  const BUILD = "2026-10-22T00:00:00Z";
  const P = (day, title, categories = []) => ({ url: `/blog/${day}/`, date: new Date(`${day}T00:00:00Z`), data: { title, categories } });
  const posts = [P("2026-10-20", "Release", ["Release-Notes"]), P("2026-10-14", "Voice"), P("2026-10-01", "Older")];
  const build = (cfg) => {
    validate(cfg);
    return resolve(cfg, posts, new Date(BUILD), SITE);
  };
  const latest = (pins, extra = {}) => ({
    sections: [{ type: "feed", title: "Latest", sources: ["pinned", "blog"], limit: 3 }],
    sources: { blog: { type: "posts" }, pinned: { type: "pinned", items: pins, ...extra } },
  });

  it("shows a post in its own place before and after a pin of it", () => {
    const sections = build(latest([{ title: "Pinned voice", url: "/blog/2026-10-14/", starts: "2026-10-23", ends: "2026-10-25" }]));
    assert.deepEqual(showingAt(sections, "2026-10-22T12:00:00Z").Latest, ["Release", "Voice", "Older"]);
    assert.deepEqual(showingAt(sections, "2026-10-24T00:00:00Z").Latest, ["Pinned voice", "Release", "Older"]);
    assert.deepEqual(showingAt(sections, "2026-10-26T00:00:00Z").Latest, ["Release", "Voice", "Older"]);
  });

  it("counts a source's limit against the items showing", () => {
    const sections = build(
      latest(
        [
          { title: "A", url: "/a/", ends: "2026-10-23T00:00:00Z" },
          { title: "B", url: "/b/", starts: "2026-10-24" },
        ],
        { limit: 1 },
      ),
    );
    assert.deepEqual(showingAt(sections, "2026-10-22T12:00:00Z").Latest, ["A", "Release", "Voice"]);
    assert.deepEqual(showingAt(sections, "2026-10-23T12:00:00Z").Latest, ["Release", "Voice", "Older"]);
    assert.deepEqual(showingAt(sections, "2026-10-24T12:00:00Z").Latest, ["B", "Release", "Voice"]);
  });

  it("brings the fallback back when the pin ends", () => {
    const sections = build({
      sections: [{ type: "feed", title: "Latest", source: "top", limit: 1 }],
      sources: { blog: { type: "posts" }, top: { type: "pinned", fallback: "blog", items: [{ title: "Pin", url: "/p/", ends: "2026-10-23T00:00:00Z" }] } },
    });
    assert.deepEqual(showingAt(sections, "2026-10-22T12:00:00Z").Latest, ["Pin"]);
    assert.deepEqual(showingAt(sections, "2026-10-23T12:00:00Z").Latest, ["Release"]);
  });

  it("leaves out the fallback behind a pin that is up for good", () => {
    const [section] = build({
      sections: [{ type: "feed", title: "Latest", source: "top", limit: 1 }],
      sources: { blog: { type: "posts" }, top: { type: "pinned", fallback: "blog", items: [{ title: "Pin", url: "/p/" }] } },
    });
    assert.deepEqual(section.entries.map((e) => e.label), ["Pin"]);
  });

  it("lets another list have a link until a pin claims it", () => {
    const sections = build({
      sections: [
        { type: "feed", title: "Latest", sources: ["pinned", "blog"], limit: 1 },
        { type: "feed", title: "Releases", source: "releases", limit: 1 },
      ],
      sources: {
        blog: { type: "posts" },
        releases: { type: "posts", category: "Release-Notes" },
        pinned: { type: "pinned", items: [{ title: "Pinned release", url: "/blog/2026-10-20/", starts: "2026-10-25" }] },
      },
    });
    assert.deepEqual(showingAt(sections, "2026-10-22T12:00:00Z"), { Latest: ["Voice"], Releases: ["Release"] });
    assert.deepEqual(showingAt(sections, "2026-10-26T00:00:00Z"), { Latest: ["Pinned release"], Releases: [] });
  });

  it("matches what the build shows", () => {
    const sections = build(latest([{ title: "Pinned voice", url: "/blog/2026-10-14/", starts: "2026-10-23" }]));
    const atBuild = showingAt(sections, BUILD);
    assert.deepEqual(atBuild, titled(sections));
  });
});
