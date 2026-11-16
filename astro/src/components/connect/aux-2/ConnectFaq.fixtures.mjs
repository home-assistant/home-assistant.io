// Fixtures for the Connect FAQ. All questions start closed.
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
    {
      name: "with call to action",
      props: {
        items: [
          {
            question: "Which streaming services are supported?",
            answer: "<p>Any service that Music Assistant supports.</p>",
            cta: { label: "See supported services", href: "#" },
          },
          { question: "A second question", answer: "<p>Its answer.</p>" },
        ],
      },
    },
  ],
};
