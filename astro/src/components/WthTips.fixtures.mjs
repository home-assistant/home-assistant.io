// Fixtures for the "Four tips for a great WTH" section, on ink.
export default {
  title: "WTH tips",
  wide: true,
  description:
    "The four tips on the inverted band, where the step figures and the " +
    "call to action invert with it.",
  variants: [
    {
      name: "default",
      liquid: "{% include_relative components/_how.html %}",
    },
  ],
};
