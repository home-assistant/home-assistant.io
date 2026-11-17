// Fixtures for the feedback card. The vote is remembered per page in
// local storage: clear it to vote again in the preview.
export default {
  title: "Page feedback",
  description:
    "“Was this page helpful?” vote and links to edit the page, " +
    "give feedback and see given feedback.",
  variants: [
    {
      name: "default",
      props: { source: "source/tos/index.markdown", version: "2026.10.1" },
      liquid: "{% include feedback.html %}",
    },
  ],
};
