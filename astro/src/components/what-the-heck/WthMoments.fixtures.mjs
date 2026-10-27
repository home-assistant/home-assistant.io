// Fixtures for the "One month, one question" section.
export default {
  title: "WTH moments",
  wide: true,
  description:
    "Three tiles of what a WTH sounds like, on the white band. One column " +
    "on phones, three where they fit.",
  variants: [
    {
      name: "default",
      liquid: "{% include_relative components/_moments.html %}",
    },
  ],
};
