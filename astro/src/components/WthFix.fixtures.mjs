// Fixtures for the "Happy with how things work?" section: the contributor
// steps and the WTHs that shipped.
export default {
  title: "WTH contributor path",
  wide: true,
  description:
    "Three steps for fixing someone else\u2019s WTH, then past WTHs as " +
    "merged pull requests, each linking to the release that shipped it.",
  variants: [
    {
      name: "default",
      liquid: "{% include_relative components/_fix.html %}",
    },
  ],
};
