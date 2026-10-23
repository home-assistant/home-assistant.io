// Fixtures for the large first card of a feed on the link-in-bio page
// (/bio/). Not a port of a Jekyll content tag, so there is no `liquid`.
export default {
  title: "BioHero",
  description: "The newest item in the bio page's Latest list, with its social image across the top.",
  variants: [
    {
      name: "blog post",
      props: {
        label: "LEDVANCE joins Works with Home Assistant",
        url: "/blog/",
        note: "Blog · October 13, 2026",
        image: "/images/blog/2026-10-ledvance/art.webp",
      },
    },
  ],
};
