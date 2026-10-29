// Fixtures for the sea of WTHs in "What is a WTH" on the Month of "What the
// Heck?!" page: the full set, and a short run with fewer bubbles. Only the
// drifting runs here; the picking needs the page's script, so they show the
// first exchange at the front.
const replies = ["Oh, right. Obviously!", "Duh, why didn’t we think of that?"];

export default {
  title: "WTH chat",
  wide: true,
  description:
    "WTHs from the forum drifting along pipes as chat bubbles, with one at " +
    "the front and its reply, and previous, next and pause below.",
  variants: [
    { name: "all WTHs", props: {} },
    {
      name: "three WTHs",
      props: {
        statements: [
          "Sending a notification is far too complicated. What the heck?!",
          "Restoring a full backup takes forever. What the heck?!",
          "I can’t invert the direction of a cover. What the heck?!",
        ],
        replies,
      },
    },
  ],
};
