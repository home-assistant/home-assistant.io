// Fixtures for the link card, in its two layouts and three tones. Not a
// port of a Jekyll element, so there is no `liquid` source.
const post = {
  href: "/blog/",
  title: "LEDVANCE joins Works with Home Assistant",
  meta: "Blog · October 13, 2026",
  image: "/images/blog/2026-10-ledvance/art.webp",
};

export default {
  title: "Card",
  description:
    "Link card with a title, a line of detail and an optional image: a row " +
    "with a 16:9 thumbnail, or stacked with the image on top; cropped to fit or " +
    "shown whole. White, accent or dark.",
  variants: [
    { name: "row", props: { href: "/docs/", title: "Documentation" } },
    { name: "row with thumbnail", props: post },
    { name: "row, accent", props: { href: "/installation/", title: "Install Home Assistant", tone: "accent" } },
    { name: "row, whole image", props: { ...post, fit: "contain" } },
    { name: "stacked", props: { ...post, layout: "stacked" } },
    { name: "stacked, whole image", props: { ...post, layout: "stacked", fit: "contain" } },
    {
      name: "stacked, dark",
      props: {
        href: "https://www.youtube.com/watch?v=XyAL1to3Lm4",
        title: "State of the Open Home 2026",
        meta: "Livestream · Starts November 15 · 18:00 UTC",
        image: "https://i.ytimg.com/vi/XyAL1to3Lm4/hqdefault.jpg",
        layout: "stacked",
        tone: "dark",
      },
    },
  ],
};
