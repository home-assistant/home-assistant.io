// Fixtures for the hero of the Month of "What the Heck?!" page. It takes
// no props: one hero, one campaign.
//
// The flow lines behind the card move as the page scrolls, which needs the
// script the page loads; here they are still.
export default {
  title: "WTH hero",
  wide: true,
  description:
    "The hero card: the wordmark with its date, the text and the two " +
    "calls to action. The key visual's lines show from 768px up.",
  variants: [
    {
      name: "default",
      liquid: "{% include_relative components/_hero.html %}",
    },
  ],
};
