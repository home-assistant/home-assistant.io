var remarkrc = {
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
    ["lint-fenced-code-flag"],
    ["lint-no-shell-dollars"],
    ["remark-lint-heading-increment"],
    ["remark-lint-heading-style", "atx"],
    ["remark-lint-unordered-list-marker-style", "-"],
    ["remark-lint-ordered-list-marker-style", "."],
    ["remark-lint-ordered-list-marker-value"],
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
      ],
    ],
  ],
};

module.exports = remarkrc;
