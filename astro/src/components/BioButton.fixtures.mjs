// Fixtures for a curated link on the link-in-bio page (/bio/), in the
// /community page's button style. Not a port of a Jekyll content tag, so
// there is no `liquid` source.
export default {
  title: "BioButton",
  description: "A curated link on the bio page as a community-style pill button; featured takes the mint accent.",
  variants: [
    { name: "plain", props: { label: "Documentation", url: "/docs/" } },
    { name: "featured", props: { label: "Install Home Assistant", url: "/installation/", featured: true } },
    { name: "with note", props: { label: "Merch store", url: "https://store.openhomefoundation.org", note: "Shirts, mugs and stickers" } },
  ],
};
