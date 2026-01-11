"use strict";

const remarkrc = {
  settings: {
    bullet: "-",
    commonmark: true,
    emphasis: "_",
    fence: "`",
    incrementListMarker: true,
    listItemIndent: 1,
    strong: "*",
  },

  plugins: [
    ["frontmatter"],

    // Code block hygiene
    ["lint-fenced-code-flag"],
    ["lint-no-shell-dollars"],

    // Heading hygiene
    ["remark-lint-heading-increment"],
    ["remark-lint-heading-style", "atx"],

    // List consistency
    ["remark-lint-unordered-list-marker-style", "-"],
    ["remark-lint-ordered-list-marker-style", "."],
    ["remark-lint-ordered-list-marker-value"],

    // ✅ Added: spacing + readability (no visual output change)
    ["remark-lint-no-multiple-toplevel-headings"],
    ["remark-lint-no-duplicate-headings"],

    // ✅ Added: prevent broken Markdown formatting
    ["remark-lint-no-empty-sections"],
    ["remark-lint-no-heading-punctuation"],

    // Branding / wording consistency rules
    [
      "remark-lint-prohibited-strings",
      [
        { no: "[Hh]ome [Aa]ss?s?istant", yes: "Home Assistant" },
        { no: "[Ww]eb[Ss]ocket", yes: "WebSocket" },
        { no: "Github", yes: "GitHub" },
        {
          no: "https://www.home-assistant.io/",
          yes: "/",
          ignoreNextTo: ['"', '"'],
        },
        { no: "Speech-[Tt]o-Text", yes: "Speech-to-text" },
        { no: "Text-[Tt]o-Speech", yes: "Text-to-speech" },

        // ✅ Added: common spelling consistency (safe + no output changes)
        { no: "HomeAssistant", yes: "Home Assistant" },
        { no: "websocket", yes: "WebSocket" },
      ],
    ],
  ],
};

module.exports = remarkrc;

