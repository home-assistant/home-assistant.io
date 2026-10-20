// Fixtures for the Connect feature card, with the four features of the
// AUX-2 page's "Audio and so much more" section. Drawn for the page's
// black, so they render on black here. The icon moves beside the text
// from 1140px.
//
// Not a port of a Jekyll element, so there is no `liquid` source.
import wholeHomeAudio from "../../assets/connect/icons/whole-home-audio.svg";
import advancedControl from "../../assets/connect/icons/advanced-control.svg";
import connectAnywhere from "../../assets/connect/icons/connect-anywhere.svg";
import bluetooth from "../../assets/connect/icons/bluetooth.svg";

const card = (icon, title, slot) => ({ props: { icon, title }, slot });

export default {
  title: "Connect feature card",
  description:
    "Icon, title and description of a product feature on a dark card. " +
    "Icon above the text on phones, beside it from 1140px.",
  variants: [
    {
      name: "AUX-2 features",
      dark: true,
      rows: [
        [
          card(
            wholeHomeAudio,
            "Whole home audio",
            "Syncs classic audio gear to your modern smart speakers.",
          ),
          card(
            advancedControl,
            "Advanced control",
            "Its serial connection gives you deep control of your audio " +
              "gear and more.",
          ),
        ],
        [
          card(
            connectAnywhere,
            "Connect anywhere",
            "Easily add PoE or WiFi to your ZWA-2.",
          ),
          card(
            bluetooth,
            "Rock-solid Bluetooth",
            "Directly connect devices to Home Assistant.",
          ),
        ],
      ],
    },
  ],
};
