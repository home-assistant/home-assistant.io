// Outgoing links open in a new tab, on whole pages: the Astro side of
// the Jekyll plugin plugins/external_links.rb, with the same rules, run
// on every page by src/middleware.ts. Keep the two in step.
//
// A link is outgoing when its href starts with "http" and does not lead
// to home-assistant.io or one of its subdomains. An outgoing link gets
// `target="_blank"` unless it already has a target, and
// `rel="external nofollow"` (after any rel it has) unless it leads to
// one of the Open Home Foundation's own sites or partners below.

const OWN = /^https?:\/\/(?:\w+\.)?home-assistant\.io(?:[/:?#]|$)/i;
const TRUSTED =
  /^https?:\/\/(?:\w+\.)?(?:home-assistant\.io|esphome\.io|nabucasa\.com|openhomefoundation\.org|music-assistant\.io|apolloautomation\.com)(?:[/:?#]|$)/i;

const attribute = (tag, name) =>
  tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));

const value = (match) => match && (match[1] ?? match[2] ?? match[3]);

// Rewrites one <a …> start tag.
export function outgoingLink(tag) {
  const href = value(attribute(tag, "href"));
  if (!href || !/^http/i.test(href) || OWN.test(href)) return tag;

  let result = tag;
  if (!attribute(result, "target")) {
    result = result.replace(/^<a\b/i, '<a target="_blank"');
  }
  if (!TRUSTED.test(href)) {
    const rel = attribute(result, "rel");
    const current = value(rel) ?? "";
    const wanted = [current, "external", "nofollow"]
      .join(" ")
      .split(/\s+/)
      .filter((word, i, all) => word && all.indexOf(word) === i)
      .join(" ");
    result = rel
      ? result.replace(rel[0], ` rel="${wanted}"`)
      : result.replace(/^<a\b/i, `<a rel="${wanted}"`);
  }
  return result;
}

// Rewrites every link in a page's HTML. Scripts and styles are left
// alone: links in their text are code or data, not markup.
export function outgoingLinks(html) {
  return html.replace(
    /<(script|style)\b[^>]*>[\s\S]*?<\/\1>|<a\b[^>]*>/gi,
    (match, element) => (element ? match : outgoingLink(match)),
  );
}
