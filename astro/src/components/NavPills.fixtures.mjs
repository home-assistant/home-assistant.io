// Fixtures for the pill row that jumps to the sections of a page. The
// two variants are the rows the Jekyll site has today. Both render in the
// site's colors here; the What the Heck page gives its row the campaign
// colors through the --nav-pills-* custom properties (see
// NavPills.astro), which the component browser does not set.
export default {
  title: "Navigation pills",
  wide: true,
  description:
    "Row of in-page navigation pills. Wraps onto more rows as the window " +
    "narrows.",
  variants: [
    {
      name: "community",
      props: {
        links: [
          { href: "#community", label: "Home Assistant Community" },
          { href: "#join", label: "Join" },
          { href: "#meetups", label: "Meetups" },
          { href: "#newsletter", label: "Newsletter" },
          { href: "#faq", label: "FAQ" },
        ],
      },
      liquid:
        '<section id="nav"><div class="nav-pills">' +
        '<a href="#community" class="nav-pill">Home Assistant Community</a>' +
        '<a href="#join" class="nav-pill">Join</a>' +
        '<a href="#meetups" class="nav-pill">Meetups</a>' +
        '<a href="#newsletter" class="nav-pill">Newsletter</a>' +
        '<a href="#faq" class="nav-pill">FAQ</a>' +
        "</div></section>",
    },
    {
      name: "what-the-heck",
      props: {
        links: [
          { href: "#moments", label: "What it is" },
          { href: "#everyone", label: "Who" },
          { href: "#how-it-works", label: "Tips" },
          { href: "#fix", label: "Fix a WTH" },
        ],
      },
      liquid: "{% include_relative components/_nav.html %}",
    },
  ],
};
