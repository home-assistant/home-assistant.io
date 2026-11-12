// Text helpers for rendered HTML.

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Joins the words of each phrase with non-breaking spaces in the text
// of `html` (between tags only, so attributes are untouched), so the
// phrase never breaks across lines. Matches any run of whitespace
// between the words, as source markup may wrap them. Scripts and styles
// are left alone: their text is code or data (such as structured data),
// where `&nbsp;` would be taken literally.
export function keepTogether(html: string, phrases: string[]): string {
  const patterns = phrases.map(
    (phrase) =>
      new RegExp(phrase.trim().split(/\s+/).map(escape).join("\\s+"), "g"),
  );
  return html.replace(
    /<(script|style)\b[^>]*>[\s\S]*?<\/\1>|>[^<]+/gi,
    (text, element) =>
      element
        ? text
        : patterns.reduce(
            (result, pattern) =>
              result.replace(pattern, (match) =>
                match.split(/\s+/).join("&nbsp;"),
              ),
            text,
          ),
  );
}
