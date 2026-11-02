// Tests for the WTH counters (src/lib/wth-stats.mjs). Run with `npm test` in
// astro/ (node's built-in test runner, no dependencies).
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import { loadWthStats, parseWthStats } from "./wth-stats.mjs";

const URL = "https://github.com/search?o=desc&q=org%3Ahome-assistant+label%3AWTH+is%3Apr&s=created&type=Issues";

describe("parseWthStats", () => {
  it("reads the counts, the link and the month the count starts", () => {
    assert.deepEqual(parseWthStats({ since: "2026-01-01", open: 3, merged: 4, url: URL }), {
      open: 3,
      merged: 4,
      url: URL,
      sinceLabel: "January 2026",
    });
  });

  it("shows zero counts", () => {
    assert.equal(parseWthStats({ since: "2026-11-01", open: 0, merged: 0, url: URL })?.open, 0);
  });

  it("leaves a date it cannot read out of the sentence", () => {
    assert.equal(parseWthStats({ since: "soon", open: 1, merged: 1, url: URL })?.sinceLabel, null);
  });

  it("returns nothing for data that is not usable", () => {
    assert.equal(parseWthStats(null), null);
    assert.equal(parseWthStats([]), null);
    assert.equal(parseWthStats({ open: "3", merged: 4, url: URL }), null);
    assert.equal(parseWthStats({ open: 3, merged: -1, url: URL }), null);
    assert.equal(parseWthStats({ open: 3, merged: 4 }), null);
    assert.equal(parseWthStats({ open: 3, merged: 4, url: "javascript:alert(1)" }), null);
  });
});

describe("loadWthStats", () => {
  it("returns nothing when the file is missing or broken", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "wth-stats-"));
    assert.equal(loadWthStats(root), null);
    fs.mkdirSync(path.join(root, "source/_data"), { recursive: true });
    fs.writeFileSync(path.join(root, "source/_data/wth_stats.json"), "not json");
    assert.equal(loadWthStats(root), null);
  });

  it("reads the file the Rake task writes", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "wth-stats-"));
    fs.mkdirSync(path.join(root, "source/_data"), { recursive: true });
    fs.writeFileSync(
      path.join(root, "source/_data/wth_stats.json"),
      JSON.stringify({ since: "2026-01-01", open: 3, merged: 4, url: URL }),
    );
    assert.equal(loadWthStats(root)?.merged, 4);
  });
});
