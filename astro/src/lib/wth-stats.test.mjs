// Tests for the pull requests that fix a WTH (src/lib/wth-stats.mjs). Run with
// `npm test` in astro/ (node's built-in test runner, no dependencies).
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import { loadWthStats, parsePullRequest, parseWthStats, seaLanes } from "./wth-stats.mjs";

const URL = "https://github.com/search?o=desc&q=org%3Ahome-assistant+label%3AWTH+is%3Apr&s=created&type=Issues";

const pr = (number, extra = {}) => ({
  number,
  title: `Fix number ${number}`,
  repo: "frontend",
  url: `https://github.com/home-assistant/frontend/pull/${number}`,
  author: "octocat",
  avatar: "https://avatars.githubusercontent.com/u/583231?s=48",
  status: "merged",
  ...extra,
});
const list = (size) => Array.from({ length: size }, (_, i) => pr(size - i));

describe("parsePullRequest", () => {
  it("reads a pull request", () => {
    assert.deepEqual(parsePullRequest(pr(7, { status: "open", created_at: "2026-11-01T00:00:00Z" })), {
      number: 7,
      title: "Fix number 7",
      repo: "frontend",
      url: "https://github.com/home-assistant/frontend/pull/7",
      author: "octocat",
      avatar: "https://avatars.githubusercontent.com/u/583231?s=48",
      status: "open",
    });
  });

  it("only links to pull requests on github.com", () => {
    for (const url of [
      "javascript:alert(1)",
      "http://github.com/home-assistant/frontend/pull/7",
      "https://github.com.example.com/home-assistant/frontend/pull/7",
      "https://github.com@example.com/home-assistant/frontend/pull/7",
      "https://user:pass@github.com/home-assistant/frontend/pull/7",
      "https://github.com:8443/home-assistant/frontend/pull/7",
      "https://example.com/home-assistant/frontend/pull/7",
      "https://github.com/home-assistant/frontend/issues/7",
      "https://github.com/home-assistant/frontend/pull/7?x=1",
      "//github.com/home-assistant/frontend/pull/7",
      "/home-assistant/frontend/pull/7",
      "",
      null,
    ]) {
      assert.equal(parsePullRequest(pr(7, { url })), null, String(url));
    }
  });

  it("only uses pictures from GitHub's avatar host", () => {
    for (const avatar of [
      "https://example.com/a.png",
      "http://avatars.githubusercontent.com/u/1",
      "https://avatars.githubusercontent.com.example.com/u/1",
      "https://avatars.githubusercontent.com@example.com/u/1",
      "data:image/svg+xml,<svg/>",
      "javascript:alert(1)",
      undefined,
    ]) {
      assert.equal(parsePullRequest(pr(7, { avatar })), null, String(avatar));
    }
  });

  it("shows open and merged pull requests, nothing else", () => {
    assert.equal(parsePullRequest(pr(7, { status: "open" }))?.status, "open");
    assert.equal(parsePullRequest(pr(7, { status: "merged" }))?.status, "merged");
    assert.equal(parsePullRequest(pr(7, { status: "closed" })), null);
    assert.equal(parsePullRequest(pr(7, { status: undefined })), null);
  });

  it("keeps a title as plain text, on one line", () => {
    const title = "Fix <img src=x onerror=alert(1)> & \"quotes\"\n\tin   the list";
    // Not changed into anything else: the markup escapes it where it is shown.
    assert.equal(parsePullRequest(pr(7, { title }))?.title, 'Fix <img src=x onerror=alert(1)> & "quotes" in the list');
  });

  it("cuts a very long title off", () => {
    assert.equal(parsePullRequest(pr(7, { title: "a".repeat(500) }))?.title.length, 200);
  });

  it("drops one without a title, a number, a repository or an author", () => {
    assert.equal(parsePullRequest(pr(7, { title: " \n " })), null);
    assert.equal(parsePullRequest(pr(7, { title: 12 })), null);
    assert.equal(parsePullRequest(pr(0)), null);
    assert.equal(parsePullRequest(pr(7, { number: "7" })), null);
    assert.equal(parsePullRequest(pr(7, { repo: "../core" })), null);
    assert.equal(parsePullRequest(pr(7, { author: "octo cat" })), null);
    assert.equal(parsePullRequest(null), null);
    assert.equal(parsePullRequest("pull request"), null);
  });
});

describe("parseWthStats", () => {
  const data = { since: "2026-01-01", open: 3, merged: 4, url: URL, prs: [pr(2, { status: "open" }), pr(1)] };

  it("reads the counts, the link, the month the count starts and the pull requests", () => {
    const stats = parseWthStats(data);
    assert.equal(stats?.open, 3);
    assert.equal(stats?.merged, 4);
    assert.equal(stats?.url, URL);
    assert.equal(stats?.sinceLabel, "January 2026");
    assert.deepEqual(
      stats?.prs.map((item) => [item.number, item.status]),
      [
        [2, "open"],
        [1, "merged"],
      ],
    );
  });

  it("shows zero counts", () => {
    assert.equal(parseWthStats({ ...data, since: "2026-11-01", open: 0, merged: 0 })?.open, 0);
  });

  it("leaves a date it cannot read out of the sentence", () => {
    assert.equal(parseWthStats({ ...data, since: "soon" })?.sinceLabel, null);
  });

  it("leaves out the pull requests that are not usable and keeps the rest", () => {
    const stats = parseWthStats({ ...data, prs: [pr(3, { url: "javascript:alert(1)" }), pr(2), "nope", pr(1, { status: "closed" })] });
    assert.deepEqual(
      stats?.prs.map((item) => item.number),
      [2],
    );
  });

  it("returns nothing without a single usable pull request", () => {
    assert.equal(parseWthStats({ ...data, prs: [] }), null);
    assert.equal(parseWthStats({ ...data, prs: [pr(1, { status: "closed" })] }), null);
    assert.equal(parseWthStats({ ...data, prs: undefined }), null);
    assert.equal(parseWthStats({ ...data, prs: "none" }), null);
  });

  it("returns nothing for data that is not usable", () => {
    assert.equal(parseWthStats(null), null);
    assert.equal(parseWthStats([]), null);
    assert.equal(parseWthStats({ ...data, open: "3" }), null);
    assert.equal(parseWthStats({ ...data, merged: -1 }), null);
    assert.equal(parseWthStats({ ...data, url: undefined }), null);
    assert.equal(parseWthStats({ ...data, url: "javascript:alert(1)" }), null);
  });
});

describe("seaLanes", () => {
  const numbers = (items) => items.map(({ pr: item }) => item.number);

  it("deals the pull requests out to four lanes, newest first", () => {
    const lanes = seaLanes(list(10));
    assert.equal(lanes.length, 4);
    // Ten, nine, ... one: lane n gets every fourth one from the n-th.
    assert.deepEqual(numbers(lanes[0].real), [10, 6, 2]);
    assert.deepEqual(numbers(lanes[1].real), [9, 5, 1]);
    assert.deepEqual(numbers(lanes[2].real), [8, 4]);
    assert.deepEqual(numbers(lanes[3].real), [7, 3]);
  });

  it("gives every pull request to exactly one lane as a link", () => {
    for (const size of [1, 2, 3, 4, 5, 7, 12, 40]) {
      const real = seaLanes(list(size)).flatMap((lane) => lane.real);
      assert.deepEqual(real.map(({ order }) => order).sort((a, b) => a - b), Array.from({ length: size }, (_, i) => i));
    }
  });

  it("fills a short lane up with copies so a run is never narrower than four cards", () => {
    for (const size of [1, 2, 3, 5, 7, 9, 40]) {
      for (const lane of seaLanes(list(size))) {
        assert.ok(lane.count >= 4, `${size} pull requests`);
        assert.equal(lane.count, lane.real.length + lane.filler.length);
      }
    }
    const lanes = seaLanes(list(7));
    // Lane 3 holds the fourth newest, then goes on every fourth around the list.
    assert.deepEqual(numbers(lanes[3].real), [4]);
    assert.deepEqual(numbers(lanes[3].filler), [7, 3, 6]);
    // No card twice in a run while there are enough different ones.
    for (const lane of lanes) assert.equal(new Set(numbers([...lane.real, ...lane.filler])).size, 4);
  });

  it("does not add copies to a long lane", () => {
    for (const lane of seaLanes(list(40))) {
      assert.equal(lane.real.length, 10);
      assert.equal(lane.filler.length, 0);
    }
  });

  it("returns nothing for no pull requests", () => {
    assert.deepEqual(seaLanes([]), []);
  });
});

describe("loadWthStats", () => {
  const write = (root, content) => {
    fs.mkdirSync(path.join(root, "source/_data"), { recursive: true });
    fs.writeFileSync(path.join(root, "source/_data/wth_stats.json"), content);
  };

  it("returns nothing when the file is missing or broken", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "wth-stats-"));
    assert.equal(loadWthStats(root), null);
    write(root, "not json");
    assert.equal(loadWthStats(root), null);
  });

  it("returns nothing for a file without pull requests", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "wth-stats-"));
    write(root, JSON.stringify({ since: "2026-01-01", open: 3, merged: 4, url: URL }));
    assert.equal(loadWthStats(root), null);
  });

  it("reads the file the Rake task writes", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "wth-stats-"));
    write(root, JSON.stringify({ since: "2026-01-01", open: 3, merged: 4, url: URL, prs: [pr(1)] }));
    assert.equal(loadWthStats(root)?.merged, 4);
    assert.equal(loadWthStats(root)?.prs.length, 1);
  });
});
