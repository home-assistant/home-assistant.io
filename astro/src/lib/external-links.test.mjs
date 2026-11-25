import { test } from "node:test";
import assert from "node:assert/strict";
import { outgoingLink, outgoingLinks } from "./external-links.mjs";

test("an outgoing link opens in a new tab, marked external", () => {
  assert.equal(
    outgoingLink('<a href="https://example.com/">'),
    '<a rel="external nofollow" target="_blank" href="https://example.com/">',
  );
});

test("links on the site itself are left alone", () => {
  for (const href of ["/docs/", "#faq", "https://www.home-assistant.io/blog/", "https://my.home-assistant.io/redirect/", "mailto:hello@example.com"]) {
    assert.equal(outgoingLink(`<a href="${href}">`), `<a href="${href}">`);
  }
});

test("a lookalike domain is outgoing", () => {
  assert.match(outgoingLink('<a href="https://home-assistant.io.example.com/">'), /target="_blank"/);
});

test("Open Home Foundation sites and partners open in a new tab, without nofollow", () => {
  assert.equal(
    outgoingLink('<a href="https://music-assistant.io/installation/">'),
    '<a target="_blank" href="https://music-assistant.io/installation/">',
  );
  assert.doesNotMatch(outgoingLink('<a href="https://support.nabucasa.com/hc/">'), /nofollow/);
});

test("an existing target and rel are kept", () => {
  assert.equal(
    outgoingLink('<a class="x" href="https://example.com" target="_self" rel="noopener">'),
    '<a class="x" href="https://example.com" target="_self" rel="noopener external nofollow">',
  );
  assert.equal(
    outgoingLink('<a href="https://example.com" rel="external">'),
    '<a target="_blank" href="https://example.com" rel="external nofollow">',
  );
});

test("links inside scripts and styles are not touched", () => {
  const html =
    '<script>const a = \'<a href="https://example.com">\';</script><a href="https://example.com">';
  assert.equal(
    outgoingLinks(html),
    '<script>const a = \'<a href="https://example.com">\';</script><a rel="external nofollow" target="_blank" href="https://example.com">',
  );
});
