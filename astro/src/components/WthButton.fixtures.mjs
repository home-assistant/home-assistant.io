// Fixtures for the Month of "What the Heck?!" button.
//
// The page uses two variants: the mint pill with the arrow for every call
// to action that leads to the forum, and the outlined one beside it in the
// hero. Hover and focus are live CSS states: point at or tab to a button
// to see them.
const forum = "https://community.home-assistant.io/c/month-of-what-the-heck/61";

export default {
  title: "WTH button",
  description:
    "Pill button for the Month of \u201cWhat the Heck?!\u201d page: mint by " +
    "default, outlined as the secondary action, with an arrow when the " +
    "link leads off the page.",
  variants: [
    {
      name: "primary",
      props: { href: forum, external: true, arrow: true },
      slot: "Share your WTH",
      liquid:
        '<a href="{{ page.forum_url }}" class="button primary" target="_blank" rel="noopener">\n' +
        "  Share your WTH\n" +
        '  <span class="icon-inline" aria-hidden="true">{% icon "mdi:arrow-right" %}</span>\n' +
        "</a>",
    },
    {
      name: "primary without arrow",
      props: { href: forum, external: true },
      slot: "Share now",
    },
    {
      name: "hollow",
      props: { href: "#moments", variant: "hollow" },
      slot: "What is it?",
      liquid: '<a href="#moments" class="button hollow">What is it?</a>',
    },
  ],
};
