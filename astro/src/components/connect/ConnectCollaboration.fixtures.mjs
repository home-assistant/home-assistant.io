// Fixtures for the Connect collaboration banner, with the AUX-2 page's
// photo and copy. Replaces source/connect/*/components/_collaboration.html.
import boardLogos from "../../assets/connect/aux-2/board-logos.webp";

export default {
  title: "Connect collaboration banner",
  description:
    "Nabu Casa and Open Home Foundation banner on light blue, photo beside " +
    "the text from 992px.",
  variants: [
    {
      name: "AUX-2",
      dark: true,
      props: {
        image: boardLogos,
        imageAlt: "The back of the Connect AUX-2's circuit board",
      },
      slot:
        "<h2>Every purchase supports the Open Home</h2><p>Nabu Casa designs " +
        "and builds official Home Assistant hardware. As a commercial " +
        "partner of the Open Home Foundation, Nabu Casa contributes the " +
        "majority of its profits from the sale of this hardware to the " +
        "foundation. This means every purchase supports the development " +
        "of projects like Home Assistant, Music Assistant, and ESPHome.</p>",
    },
  ],
};
