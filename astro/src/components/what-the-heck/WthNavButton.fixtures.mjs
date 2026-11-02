// Fixtures for the "WTH" item in the main menu, which promotes the Month of
// "What the Heck?!". It is an `<li>` of the menu, so here it is shown on its
// own, on the two headers it is made for. Hover it to speed the doodle up.
export default {
  title: "WTH header button",
  description:
    "The pill with the doodle of the What the Heck?! hero in it. White with " +
    "a mint rim on light headers, ink with a mint label over the homepage " +
    "hero’s blue.",
  variants: [
    { name: "light header", props: {} },
    { name: "dark header, over a hero image", dark: true, props: { onDark: true } },
  ],
};
