// Fixtures for the counters in "Comfortable with code? Fix someone else’s WTH!":
// how many pull requests fix a WTH, and the link to all of them on GitHub.
const url =
  "https://github.com/search?o=desc&q=org%3Ahome-assistant+label%3AWTH+is%3Apr+created%3A%3E%3D2026-01-01&s=created&type=Issues";

export default {
  title: "WTH counters",
  description:
    "Two big numbers for the pull requests that fix a WTH, being worked on " +
    "and shipped, with a link to the full list on GitHub. Renders nothing " +
    "when the numbers could not be counted.",
  variants: [
    {
      name: "default",
      props: {
        stats: { open: 3, merged: 4, url, sinceLabel: "January 2026" },
      },
    },
    {
      name: "bigger numbers",
      props: {
        stats: { open: 128, merged: 1042, url, sinceLabel: "November 2026" },
      },
    },
    { name: "not counted", props: {} },
  ],
};
