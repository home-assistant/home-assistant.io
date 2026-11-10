// Fixtures for the collaboration badge: by default "Designed and built
// by" with the Nabu Casa and Open Home Foundation logos, as on the
// Jekyll product pages; a page can change the label (`label`) and leave
// out the Open Home Foundation logo (`foundation: false`), as the
// Connect AUX-2 hero does. White on a translucent panel, so it renders
// on black here. A step smaller below 480px, larger from 992px.
export default {
  title: "Collaboration badge",
  description:
    "\"Designed and built by\" with the Nabu Casa and Open Home " +
    "Foundation logos, for product page heroes. Smaller below 480px, " +
    "larger from 992px.",
  variants: [
    {
      name: "default",
      dark: true,
      liquid: "{% include collaboration/ohf-x-nabu-casa.html %}",
    },
    {
      name: "Nabu Casa only (Connect AUX-2)",
      dark: true,
      props: { label: "Designed and manufactured by", foundation: false },
    },
  ],
};
