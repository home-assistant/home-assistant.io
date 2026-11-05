// Fixtures for the "This year’s challenge" section: the wide card of
// questions to ask the rest of the household.
export default {
  title: "WTH challenge",
  wide: true,
  description:
    "The household card of questions, in a single column.",
  variants: [
    {
      name: "default",
      liquid: "{% include_relative components/_everyone.html %}",
    },
  ],
};
