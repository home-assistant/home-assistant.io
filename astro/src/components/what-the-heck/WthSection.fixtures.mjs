// Fixtures for the section shell on the Month of "What the Heck?!" page:
// the band, the content container and the heading with its mint rule. One
// variant per surface the page uses.
const lead = "What in Home Assistant makes you go \u201cwhat the heck?!\u201d";

export default {
  title: "WTH section",
  wide: true,
  description:
    "Section shell for the Month of \u201cWhat the Heck?!\u201d page, on " +
    "each of its four surfaces: the page, white, the tinted band and ink.",
  variants: [
    {
      name: "page",
      props: { id: "preview-page", heading: "One month, one question", lead },
      slot: "<p>The section's content goes here.</p>",
    },
    {
      name: "white",
      props: {
        id: "preview-surface",
        tone: "surface",
        heading: "Happy with how things work?",
        lead,
      },
      slot: "<p>The section's content goes here.</p>",
    },
    {
      name: "band",
      props: {
        id: "preview-band",
        tone: "band",
        heading: "We want to hear from everyone",
      },
      slot: "<p>The section's content goes here.</p>",
    },
    {
      name: "ink",
      props: {
        id: "preview-ink",
        tone: "ink",
        heading: "Four tips for a great WTH",
        lead,
      },
      slot: "<p>The section's content goes here.</p>",
    },
  ],
};
