// Fixtures for the collaboration badge. It takes no props: every
// product page shows the same two partners. White on a translucent
// panel, so it renders on black here. Larger from 1140px.
export default {
  title: "Collaboration badge",
  description:
    "\"Designed and built by\" with the Nabu Casa and Open Home " +
    "Foundation logos, for product page heroes. Larger from 1140px.",
  variants: [
    {
      name: "default",
      dark: true,
      liquid: "{% include collaboration/ohf-x-nabu-casa.html %}",
    },
  ],
};
