// Fixtures for the closing call to action on the Month of "What the
// Heck?!" page.
//
// The flow lines in the card move as the page scrolls, which needs the
// script the page loads; here they are still, and they show from 1024px.
export default {
  title: "WTH closing card",
  wide: true,
  description:
    "The mint closing card, with the campaign\u2019s flow lines along both " +
    "edges and the shared button in its navy scheme.",
  variants: [
    {
      name: "default",
      liquid: "{% include_relative components/_cta.html %}",
    },
  ],
};
