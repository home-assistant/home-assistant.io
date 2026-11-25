// Fixtures for the Connect hotspots panel, with the AUX-2 page's intro
// and three of its ports: audio and RS-232 on the audio side, Ethernet
// on the back. Select a point or a title to open its card; "Click to
// rotate" fades to the back.
//
// Not a port of a Jekyll element, so there is no `liquid` source.
import sideAudio from "../../../assets/connect/aux-2/aux-2-side-audio.webp";
import sideBack from "../../../assets/connect/aux-2/aux-2-side-back.webp";
import wholeHomeAudio from "../../../assets/connect/icons/whole-home-audio.svg";
import serialPorts from "../../../assets/connect/icons/serial-ports.svg";
import connectAnywhere from "../../../assets/connect/icons/connect-anywhere.svg";

export default {
  title: "Connect hotspots",
  description:
    "A product's ports as points on two photos of it, one of each side, " +
    "each opening its card in a list beside them, with a button that " +
    "fades to the other side.",
  variants: [
    {
      name: "Default",
      dark: true,
      props: {
        photos: [sideAudio, sideBack],
        label: "The Connect AUX-2",
        open: 0,
        ports: [
          {
            side: 0,
            label: "Audio port",
            spot: [0.5285, 0.652],
            icon: wholeHomeAudio,
            title: "Stream audio",
            text: "Analogue and digital via 3,5mm or SPDIF.",
          },
          {
            side: 0,
            label: "RS-232 ports",
            spot: [0.4215, 0.69],
            icon: serialPorts,
            title: "Advanced control",
            text: "Control devices that talk RS-232 with these two ports.",
          },
          {
            side: 1,
            label: "Ethernet port",
            spot: [0.5008, 0.66],
            icon: connectAnywhere,
            title: "Power over Ethernet",
            text: "Power and connect it with one cable from a PoE switch.",
          },
        ],
      },
      slot:
        '<h2 style="margin:0;font-size:2.75rem;letter-spacing:-0.04em">Connect everything</h2>' +
        '<p style="margin:0;font-size:1.5rem;line-height:1.2">Stream audio, control legacy devices ' +
        "over RS-232, add sensors and extend your Zigbee or Z-Wave network, all from one small box.</p>",
    },
  ],
};
