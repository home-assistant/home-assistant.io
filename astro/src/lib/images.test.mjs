// Tests for resized images (src/lib/images.mjs). Run with `npm test` in
// astro/ (node's built-in test runner, no dependencies).
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { REMOTE_IMAGE_HOSTS, resized } from "./images.mjs";

describe("resized", () => {
  it("resizes images from this site", () =>
    assert.equal(resized("/images/a b.png", 192), "/.netlify/images?url=%2Fimages%2Fa%20b.png&w=192"));

  it("resizes images from an allowed host", () =>
    assert.equal(
      resized("https://store.openhomefoundation.org/x.webp?v=1", 288),
      "/.netlify/images?url=https%3A%2F%2Fstore.openhomefoundation.org%2Fx.webp%3Fv%3D1&w=288",
    ));

  it("leaves other images alone", () => {
    assert.equal(resized("https://example.com/x.png", 192), null);
    assert.equal(resized("http://store.openhomefoundation.org/x.png", 192), null);
    assert.equal(resized("//store.openhomefoundation.org/x.png", 192), null);
    assert.equal(resized(null, 192), null);
  });
});

// netlify.toml must allow every host the CDN is sent images from, or
// those thumbnails fail to load on the live site.
describe("netlify.toml", () => {
  const toml = fs.readFileSync(path.resolve(process.cwd(), "../netlify.toml"), "utf8");
  const patterns = [...toml.matchAll(/^\s*"(https:[^"]+)",?\s*$/gm)].map(
    ([, pattern]) => new RegExp(`^${pattern.replaceAll("\\\\", "\\")}$`),
  );

  for (const host of REMOTE_IMAGE_HOSTS) {
    it(`allows ${host}`, () =>
      assert.ok(patterns.some((pattern) => pattern.test(`https://${host}/image.png`))));
  }
});
