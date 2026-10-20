// Fixtures for the Connect collaboration banner, with the AUX-2 page's
// photo and copy. Replaces source/connect/*/components/_collaboration.html.
import boardLogos from "../../assets/connect/aux-2/board-logos.webp";

export default {
  title: "Connect collaboration banner",
  description:
    "\"Brought to you by Nabu Casa\" banner on light blue, photo beside " +
    "the text from 1140px.",
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
        "and builds official Home Assistant hardware. As the commercial " +
        "partner of the Open Home Foundation, Nabu Casa contributes the " +
        "majority of its profits to the foundation.</p>",
    },
  ],
};
