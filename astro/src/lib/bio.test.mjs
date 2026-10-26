// Tests for the bio page logic (src/lib/bio.mjs). Run with `npm test` in
// astro/ (node's built-in test runner, no dependencies).
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import { BioConfigError, dataItems, imageFor, loadPosts, resolve, validate, youtubeId } from "./bio.mjs";

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
    cfg.sources.latest.items = [{ title: "Launch", url: "/launch/", expires: "2026-11-01" }];
    assert.deepEqual(labels(cfg), ["Launch"]);
  });

  it("hands back to the feed once expired", () => {
    const cfg = config();
    cfg.sources.latest.items = [{ title: "Launch", url: "/launch/", expires: "2026-10-01" }];
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
      merged(mergedConfig({ limit: 10, insert: [{ title: "Community Day", url: "https://example.test/day/", date: "2026-10-10", label: "Event" }] })),
      [
        ["Voice", "Blog · October 14, 2026"],
        ["Community Day", "Event · October 10, 2026"],
        ["Latest issue", "Newsletter · October 1, 2026"],
        ["2026.10", "Blog · October 1, 2026"],
      ],
    ));

  it("become the hero when newest", () => {
    const cfg = mergedConfig({ hero: true, insert: [{ title: "Launch", url: "https://example.test/launch/", date: "2026-10-20", image: "auto" }] });
    const tile = resolve(cfg, POSTS, NOW, SITE, { newsletter: NEWSLETTER })[0].tiles[0];
    assert.equal(tile.label, "Launch");
    assert.equal(tile.kind, "hero");
    assert.ok(tile.image.includes("assets.openhomefoundation.org/opengraph"));
  });

  it("need a date", () => assertInvalid(mergedConfig({ insert: [{ title: "Undated", url: "/x/" }] }), "sections[0].insert[0].date: is required"));

  it("need a valid date", () =>
    assertInvalid(mergedConfig({ insert: [{ title: "Bad", url: "/x/", date: "10/11/2026" }] }), 'sections[0].insert[0].date: "10/11/2026" is not a date'));
});

describe("YouTube inserts", () => {
  const video = (overrides = {}) => ({
    type: "youtube",
    video: "https://www.youtube.com/watch?v=XyAL1to3Lm4",
    title: "State of the Open Home",
    start: "2026-11-15T18:00:00Z",
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
    assert.equal(tiles([video({ start: "2026-11-15" })])[0].note, "Livestream · Starts November 15"));

  it("shows the date once it has started, in date order", () => {
    const list = tiles([video({ start: "2026-10-10T18:00:00Z" })]);
    assert.deepEqual(
      list.map((tile) => tile.label),
      ["Voice", "State of the Open Home", "Latest issue", "2026.10"],
    );
    assert.equal(list[1].note, "Livestream · October 10, 2026");
    assert.equal(list[1].kind, "video");
  });

  it("needs a recognizable video", () =>
    assertInvalid(mergedConfig({ insert: [video({ video: "not a video" })] }), "sections[0].insert[0].video: must be a YouTube video ID or link"));

  it("needs a start", () =>
    assertInvalid(mergedConfig({ insert: [video({ start: undefined })] }), "sections[0].insert[0].start: is required"));

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
