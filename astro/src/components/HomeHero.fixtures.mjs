// Fixtures for the homepage hero. On the live site the integration
// count is the number of pages in the `integrations` collection with
// both `ha_category` and `title`; Astro does not read that collection
// yet, so the count comes in as a prop.
//
// The hero reserves room for the header at its top. On the homepage the
// layout draws the header over it; here that band stays empty.
export default {
  title: "Homepage hero",
  // Full-width component: give it a whole row in the component browser.
  wide: true,
  description:
    "Headline, lead, calls to action, GitHub badge and the live demo " +
    "phone. Stacks below 1140px, with the demo screenshot peeking up " +
    "from the bottom edge.",
  variants: [
    {
      name: "default",
      props: { integrationCount: 1563 },
      liquid: "{% include site/hero_unit.html %}",
    },
  ],
};
