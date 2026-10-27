// Fixtures for the "We want to hear from everyone" section, including the
// wide card of questions to ask the rest of the household.
export default {
  title: "WTH audiences",
  wide: true,
  description:
    "Who the month is for: three cards on the tinted band, then the " +
    "household card, which splits into two columns from 1140px.",
  variants: [
    {
      name: "default",
      liquid: "{% include_relative components/_everyone.html %}",
    },
  ],
};
