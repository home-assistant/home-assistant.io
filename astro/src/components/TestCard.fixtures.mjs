// Fixtures for the throwaway TestCard component. Delete both files
// once real components exist.
export default {
  title: "Test card",
  description:
    "Throwaway component that exercises the component browser.",
  variants: [
    {
      name: "neutral",
      slot: "A plain card with <a href='#'>a link</a> in the slot.",
    },
    {
      name: "info with heading",
      props: { tone: "info", heading: "Did you know?" },
      slot: "Props and slot content combined.",
    },
    {
      name: "warning",
      props: { tone: "warning" },
      slot: "<p>Multiple paragraphs work.</p><p>Like this one.</p>",
    },
  ],
};
