// Fixtures for the Connect specifications, with part of the AUX-2 page's
// specs: plain items and an item with labelled values.
import { drawing } from "../../../pages/connect/aux-2/_content";

export default {
  title: "Connect specifications",
  wide: true,
  description:
    "Spec groups beside an exploded drawing; the drawing stays in view " +
    "from 992px.",
  variants: [
    {
      name: "AUX-2 excerpt",
      dark: true,
      props: {
        drawing,
        drawingAlt: "Exploded line drawing of the Connect AUX-2",
        groups: [
          {
            title: "Material",
            items: [
              { label: "Enclosure", value: ["Polycarbonate plastic"] },
              { label: "Colors", value: ["White and semi-transparent"] },
            ],
          },
          {
            title: "Product details",
            items: [
              {
                label: "Connectivity",
                details: [
                  { term: "Wireless", value: ["Wi-Fi, Bluetooth"] },
                  { term: "Wired", value: ["Power-over-Ethernet (802.3af)"] },
                ],
              },
            ],
          },
        ],
      },
    },
  ],
};
