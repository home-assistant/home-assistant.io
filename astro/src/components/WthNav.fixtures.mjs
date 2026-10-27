// Fixtures for the pill row under the site header on the Month of "What
// the Heck?!" page. It takes no props: the links are the page's sections.
export default {
  title: "WTH page navigation",
  wide: true,
  description:
    "In-page navigation for the Month of \u201cWhat the Heck?!\u201d page. " +
    "Wraps onto more rows as the window narrows.",
  variants: [
    {
      name: "default",
      liquid: "{% include_relative components/_nav.html %}",
    },
  ],
};
