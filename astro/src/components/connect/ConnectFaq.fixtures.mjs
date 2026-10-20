// Fixtures for the Connect FAQ. The first question starts open.
export default {
  title: "Connect FAQ",
  wide: true,
  description: "Accordion of questions on light gray.",
  variants: [
    {
      name: "default",
      props: {
        items: [
          {
            question: "Which adapters can I connect over USB?",
            answer: "<p>An example answer, with <a href='#'>a link</a>.</p>",
          },
          { question: "A second question", answer: "<p>Its answer.</p>" },
        ],
      },
    },
  ],
};
