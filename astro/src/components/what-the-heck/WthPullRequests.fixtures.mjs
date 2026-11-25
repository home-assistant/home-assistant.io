// Fixtures for the pull requests in "Comfortable with code? Fix someone else’s WTH!":
// the sea of cards, the counts above it and the link to the whole list on
// GitHub. They are what `parseWthStats` (src/lib/wth-stats.mjs) returns.
const url =
  "https://github.com/search?o=desc&q=org%3Ahome-assistant+label%3AWTH+is%3Apr+created%3A%3E%3D2026-01-01&s=created&type=Issues";

const authors = [
  ["octocat", 583231],
  ["hubot", 480938],
  ["monalisa", 2161],
];
const titles = [
  "Fix date-only attribute formatting to not shift into other days",
  "Add move to area to the helpers list bulk actions",
  "List running automations & scripts in restart dialog",
  "Add activity-panel CSV download",
  "Virtualize notification drawer",
  "Store automation traces in separate retention buckets by finish reason",
  "Let the backup card show when the last automatic backup ran",
  "Show the battery level next to the device name in the device list",
];
const repos = ["frontend", "core", "frontend", "home-assistant.io", "android"];

// The newest first, as the Rake task writes them: every third one is still open.
const pullRequest = (number, index) => {
  const [author, id] = authors[index % authors.length];
  return {
    number,
    title: titles[index % titles.length],
    repo: repos[index % repos.length],
    url: `https://github.com/home-assistant/${repos[index % repos.length]}/pull/${number}`,
    author,
    avatar: `https://avatars.githubusercontent.com/u/${id}?s=48`,
    status: index % 3 === 1 ? "open" : "merged",
  };
};
const pullRequests = (size) => Array.from({ length: size }, (_, index) => pullRequest(55536 - index * 7, index));

export default {
  title: "WTH pull requests",
  wide: true,
  description:
    "The pull requests that fix a WTH as cards drifting along the pipes, " +
    "with how many are being worked on and shipped and a link to the full " +
    "list on GitHub. Renders nothing when there are none to show. With " +
    "reduced motion it is a grid of the newest.",
  variants: [
    {
      name: "default",
      props: {
        stats: { open: 3, merged: 4, url, sinceLabel: "January 2026", prs: pullRequests(7) },
      },
    },
    {
      name: "forty pull requests",
      props: {
        stats: { open: 128, merged: 1042, url, sinceLabel: "November 2026", prs: pullRequests(40) },
      },
    },
    {
      name: "two pull requests",
      props: {
        stats: { open: 1, merged: 1, url, sinceLabel: "November 2026", prs: pullRequests(2) },
      },
    },
    {
      name: "long titles",
      props: {
        stats: {
          open: 1,
          merged: 3,
          url,
          sinceLabel: "January 2026",
          prs: [
            {
              ...pullRequest(55536, 0),
              title:
                "Fix the date-only attribute formatting so it does not shift into other days when the time zone of the browser and the server differ",
            },
            { ...pullRequest(55529, 1), repo: "a-very-long-repository-name", author: "an-author-with-a-very-long-login" },
            { ...pullRequest(55522, 2), title: "Handle <script>alert(1)</script> & \"quotes\" in titles as text" },
            pullRequest(55515, 3),
          ],
        },
      },
    },
    { name: "none to show", props: {} },
  ],
};
