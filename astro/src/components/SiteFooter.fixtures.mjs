// Fixtures for the site footer. It takes no props: every page shows
// the same footer.
//
// The footer renders in normal flow here, skyline included. On a page
// the layout adds the margin between the content and the footer; the
// Jekyll layout leaves 64px above the skyline.
export default {
  title: "Site footer",
  // Full-width component: give it a whole row in the component browser.
  wide: true,
  description:
    "Skyline, wordmark, link groups, social links and the contact, " +
    "analytics and hosting notices. One column on phones, two from " +
    "481px, four from 1140px.",
  variants: [
    {
      name: "default",
      liquid: "{% include site/footer.html %}",
    },
  ],
};
