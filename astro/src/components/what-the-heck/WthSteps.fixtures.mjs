// Fixtures for the numbered steps on the Month of "What the Heck?!" page.
// Both lists on the page are here, plus the four-step list on the dark
// band, where the figures and their rules turn mint.
const tips = [
  {
    title: "Check it\u2019s not already there",
    text: "If it is, there\u2019s no need to post again.",
  },
  {
    title: "Share one at a time",
    text: "So each can be discussed and followed on its own.",
  },
  {
    title: "Tell it like it is",
    text: "Explain the problem, we\u2019ll figure out the fix.",
  },
  { title: "Be kind", text: "That includes everyone on our forum!" },
];

const steps = [
  { title: "Pick it", text: "Browse the WTHs and find one you can take on." },
  { title: "Claim it", text: "Reply so nobody builds the same thing twice." },
  { title: "Ship it", text: "Open a pull request and link it back to the WTH." },
];

export default {
  title: "WTH steps",
  wide: true,
  description:
    "Numbered steps with a rule running to the edge of each column. The " +
    "columns follow the width available, so the list reflows rather than " +
    "switching at a breakpoint.",
  variants: [
    { name: "four tips", props: { steps: tips } },
    { name: "three steps", props: { steps, columnWidth: "15rem" } },
  ],
};
