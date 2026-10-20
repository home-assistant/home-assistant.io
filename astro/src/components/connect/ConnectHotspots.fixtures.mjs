// Fixtures for the Connect hotspots, with two of the AUX-2 page's ports.
// The intro (the default slot) is plain text here. Select a point to
// switch the card; from 1140px a line joins the point to its card.
//
// Not a port of a Jekyll element, so there is no `liquid` source.
import portsImage from "../../assets/connect/aux-2/ports.jpg";
import wholeHomeAudio from "../../assets/connect/icons/whole-home-audio.svg";
import advancedControl from "../../assets/connect/icons/advanced-control.svg";

export default {
  title: "Connect hotspots",
  wide: true,
  description:
    "Product photo with clickable points that open a card each, joined " +
    "by a line from 1140px. Photo zoomed in, card below, on phones.",
  variants: [
    {
      name: "AUX-2 ports",
      props: {
        image: portsImage,
        imageAlt: "The Connect AUX-2 from the front",
        selected: "audio",
        hotspots: [
          {
            id: "serial",
            label: "RS-232 ports",
            x: 40,
            y: 70.76,
            icon: advancedControl,
            title: "Advanced control",
            text: "Control devices that talk RS-232 with these two ports.",
          },
          {
            id: "audio",
            label: "Audio port",
            x: 53.96,
            y: 65,
            icon: wholeHomeAudio,
            title: "Stream audio",
            text: "Analogue and digital via 3,5mm or SPDIF.",
          },
        ],
      },
    },
  ],
};
