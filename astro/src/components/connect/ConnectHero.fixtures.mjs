// Fixtures for the Connect product hero, with the AUX-2 page's photo
// and copy. On a page the product bar (ConnectNav) fills the hero's
// `nav` slot; fixtures cannot fill named slots, so the bar is left out
// here and has its own entry.
//
// The content width here is the site's; product pages narrow it to
// --layout-product-width.
//
// Not a port of a Jekyll element, so there is no `liquid` source.
import heroImage from "../../assets/connect/aux-2/hero.webp";

export default {
  title: "Connect product hero",
  // Full-width component: render it edge to edge in the component browser.
  wide: true,
  description:
    "Product photo with the tagline, product name, lead text and " +
    "partner credits. Stacks below 1140px.",
  variants: [
    {
      name: "AUX-2",
      props: {
        image: heroImage,
        imageAlt:
          "The Connect AUX-2 on a wooden sideboard between an amplifier " +
          "and a speaker",
        product: "Connect AUX-2",
        tagline: ["Old speakers.", "New tricks."],
      },
      slot:
        "Bring your audio equipment into your smart home with advanced " +
        "control and Power-over-Ethernet.",
    },
  ],
};
