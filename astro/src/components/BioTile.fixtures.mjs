// Fixtures for one link on the link-in-bio page (/bio/). Not a port of a
// Jekyll content tag, so there is no `liquid` source.
export default {
  title: "BioTile",
  description: "A link on the bio page: label, optional second line and thumbnail, or the featured color.",
  variants: [
    { name: "plain", props: { label: "Documentation", url: "/docs/" } },
    {
      name: "with note and thumbnail",
      props: {
        label: "LEDVANCE joins Works with Home Assistant",
        url: "/blog/",
        note: "Blog · October 13, 2026",
        image: "/images/blog/2026-10-ledvance/art.webp",
      },
    },
    { name: "featured", props: { label: "Install Home Assistant", url: "/installation/", featured: true } },
  ],
};
