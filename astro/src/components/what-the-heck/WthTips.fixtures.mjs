// Fixtures for the "Four tips for a great WTH" section, on the tinted band.
export default {
  title: "WTH tips",
  wide: true,
  description:
    "The four tips on the tinted blue band, with the numbered steps and " +
    "the call to action.",
  variants: [
    {
      name: "default",
      liquid: "{% include_relative components/_how.html %}",
    },
  ],
};
