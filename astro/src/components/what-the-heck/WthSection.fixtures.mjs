// Fixtures for the section shell on the Month of "What the Heck?!" page:
// the band, the content container and the heading with its mint rule. One
// variant per surface the page uses.
const lead =
  "All month, we want your WTHs! Every one helps make Home Assistant better.";

export default {
  title: "WTH section",
  wide: true,
  description:
    "Section shell for the Month of \u201cWhat the Heck?!\u201d page, on " +
    "each of its three surfaces: the page, white and the tinted band.",
  variants: [
    {
      name: "page",
      props: { id: "preview-page", heading: "What is a WTH?", lead },
      slot: "<p>The section's content goes here.</p>",
    },
    {
      name: "white",
      props: {
        id: "preview-surface",
        tone: "surface",
        heading: "Comfortable with code? Fix someone else\u2019s WTH!",
        lead,
      },
      slot: "<p>The section's content goes here.</p>",
    },
    {
      name: "band",
      props: {
        id: "preview-band",
        tone: "band",
        heading: "This year\u2019s challenge",
      },
      slot: "<p>The section's content goes here.</p>",
    },
  ],
};
