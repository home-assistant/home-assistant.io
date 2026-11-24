// Specifications and FAQ of the Connect AUX-2 page, from the Figma file
// "Connect AUX-2" ("Specs", node 2002:31255; "FAQ", node 2002:36190).
// The leading underscore keeps this file out of the page routes.
import type { FaqItem } from "../../../components/connect/aux-2/ConnectFaq.astro";
import explodedBase from "../../../assets/connect/aux-2/exploded-base.svg";
import explodedBoard from "../../../assets/connect/aux-2/exploded-board.webp";
import explodedLid from "../../../assets/connect/aux-2/exploded-lid.svg";
import explodedRender from "../../../assets/connect/aux-2/exploded-render.png";
import explodedOpen from "../../../assets/connect/aux-2/exploded-open.mp4";
import explodedScrub from "../../../assets/connect/aux-2/exploded-scrub.mp4";
import explodedPoster from "../../../assets/connect/aux-2/exploded-poster.webp";
import explodedLines from "../../../assets/connect/aux-2/exploded-lines.png";

// The Figma file's exploded drawing (node 2142:53785, 500 × 620.29)
// in three layers: the lid and base shell as SVG, the circuit board as
// a 2x WebP (5,700 shapes, over 1 MB as SVG), at their Figma positions.
export const drawing = {
  ratio: 500 / 620.29,
  base: { image: explodedBase, x: 0, y: 40.02, w: 100 },
  board: { image: explodedBoard, x: 3.44, y: 41.78, w: 90.4 },
  lid: { image: explodedLid, x: 1.31, y: 0, w: 97.8 },
  closed: 60,
};

// The same drawing as a photoreal Blender render of the exploded device
// (1000 × 1898: feet, screws, shell, board and lid), cropped so the
// device spans the full width; it replaces the line-drawing layers and
// the box takes the render's proportions. Its opening animation runs
// 2 s at 60 fps, H.264 without sound (665 KB to play, 2.7 MB with every
// frame a keyframe for scroll scrubbing). Not shown at the moment: the
// specs use the exploded line drawing (linesDrawing below). Kept so
// the page can switch back by passing it to ConnectSpecs.
export const renderDrawing = {
  ...drawing,
  render: explodedRender,
  video: { open: explodedOpen, scrub: explodedScrub, poster: explodedPoster },
};

// The exploded line drawing beside the specs: lid, board, shell and
// screws in one image (500 × 1052, white lines on black), the ports
// already facing the spec text. It takes the render's place, without
// the opening animation.
export const linesDrawing = { ...drawing, render: explodedLines };

export const specs = [
  {
    title: "Dimensions and weight",
    items: [
      { label: "Device", value: ["106 × 63 × 25 mm", "104 g"] },
      { label: "With box", value: ["110 × 72 × 28 mm", "136 g"] },
    ],
  },
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
      { label: "SoCs", value: ["ESP32-S3"] },
      { label: "Digital-to-Analog Converter (DAC) chip", value: ["TI PCM5122", "112 dB SNR"] },
      {
        label: "Power",
        value: ["USB-C", "2A (or higher) / 5 V DC", "Power-over-Ethernet (802.3af)"],
      },
      {
        label: "Audio",
        details: [
          {
            term: "Connectivity",
            value: [
              "Combined optical (S/PDIF) and analog audio 3.5mm port*",
              "(*only one at a time)",
            ],
          },
          {
            term: "Analogue audio capabilities",
            value: ["24-bit/48kHz stereo"],
          },
          {
            term: "Digital audio capabilities",
            value: ["24-bit/48kHz stereo", "Stereo PCM lossless audio"],
          },
          {
            term: "Synchronized whole home audio",
            value: ['Supported via <a href="https://www.sendspin-audio.com/">Sendspin</a>'],
          },
          {
            term: "Internal audio codec support",
            value: ["FLAC, MP3, and WAV"],
          },
        ],
      },
      {
        label: "Serial",
        details: [
          {
            term: "Serial ports (1 & 2)",
            value: [
              "3.5mm connector for RS-232",
              "Example connectivity: consumer AV equipment, TVs, Pro AV equipment, UPS, climate controllers*",
              "*Some devices may require converter cables (ex. DB9/RJ9/RJ11/MiniDIN)",
            ],
          },
          {
            term: "TX / RX switches",
            value: [
              "Switch transmit and receive lines for Serial 1 and Serial 2 for extra compatibility",
            ],
          },
          {
            term: "USB input",
            value: ["USB-A data for Connect ZWA-2 and RS-485 adapter"],
          },
        ],
      },
      {
        label: "Connectivity",
        details: [
          {
            term: "Wireless",
            value: ["Wi-Fi (2.4 GHz, 802.11b/g/n),", "Bluetooth 5 (LE)"],
          },
          {
            term: "Wired",
            value: [
              "Power-over-Ethernet (802.3af),",
              "Ethernet (*USB-C power required)",
            ],
          },
        ],
      },
      {
        label: "Software",
        details: [
          { term: "Built for Home Assistant", value: ["Yes"] },
          { term: "Built on ESPHome", value: ["Yes"] },
          {
            term: "Unlocked bootloader",
            value: [
              "Yes, device firmware is built on ESPHome, and can be flashed with custom firmware.",
            ],
          },
        ],
      },
      {
        label: "Environmental conditions for operation",
        value: [
          "Indoor use only",
          "0–65 °C (32–149 °F)",
          "",
          "Humidity: non-condensing",
          "Keep in a dry, not excessively dusty, environment to avoid damage to the unit.",
          "",
          "Do not leave the unit in direct sunlight or near any heat source, as this can cause overheating.",
        ],
      },
      {
        label: "In the box",
        value: [
          "Home Assistant Connect AUX-2",
          "QuickStart guide",
          "Warranty and Safety Information",
        ],
      },
    ],
  },
];

// FAQ, word for word from the "AUX-2 FAQ" sheet, in its order. Answers
// are HTML. Each item can take an optional `cta` ({ label, href }),
// shown as a button under the answer.
export const faq: FaqItem[] = [
  {
    question: "Does Connect AUX-2 require Home Assistant to work?",
    answer:
      "<p>Yes. Connect AUX-2 is built to be a native Home Assistant device to give you full local control and privacy. To take advantage of these benefits, you'll need to run Home Assistant 2026.9 or later to setup and manage your system, and it will be added to the ESPHome integration.</p>",
    cta: {
      label: "Set up Home Assistant Connect AUX-2",
      href: "https://support.nabucasa.com/hc/en-us/articles/40527754954653",
    },
  },
  {
    question: "Does it have an audio input?",
    answer:
      "<p>No. Connect AUX-2 has been designed to play music rather than receive it, so only has an audio output.</p>",
    cta: {
      label: "What Connect AUX-2 is and how it works",
      href: "https://support.nabucasa.com/hc/en-us/articles/40528879660317",
    },
  },
  {
    question: "Can it send or receive Bluetooth audio?",
    answer:
      "<p>No. Audio plays only through the 3.5 mm audio output.</p>",
    cta: {
      label: "Specifications and resources",
      href: "https://support.nabucasa.com/hc/en-us/articles/40528929207453#audio",
    },
  },
  {
    question: "Does Connect AUX-2 come with any audio or serial cables?",
    answer:
      "<p>No. Audio setups vary widely, from 3.5 mm AUX and RCA to dedicated RS-232 serial connections. Buying cables separately lets you choose the exact length and connector type that fits your equipment. See <a href=\"#specs\">In the box</a> for what’s included.</p>",
    cta: {
      label: "What's in the box",
      href: "https://support.nabucasa.com/hc/en-us/articles/40528614062621",
    },
  },
  {
    question: "Does it work with every device that uses serial?",
    answer:
      "<p>No. It can only control serial devices that have an integration in Home Assistant.</p>",
    cta: {
      label: "Controlling devices over serial (RS-232)",
      href: "https://support.nabucasa.com/hc/en-us/articles/40528797748125",
    },
  },
  {
    question: "Can AUX-2 connect with Zigbee devices?",
    answer:
      "<p>Yes, but we recommend caution. This setup hasn’t been widely tested yet, and the setup guide is in the developer documentation. It works only with ZHA, not Zigbee2MQTT, and needs Home Assistant 2026.11 or later.</p>",
    cta: {
      label: "ZBT-2 setup guide (developer section)",
      href: "https://support.nabucasa.com/hc/en-us/articles/40529064396445",
    },
  },
  {
    question: "Can it connect Thread devices?",
    answer:
      "<p>No. Thread connectivity isn't planned for Connect AUX-2.</p>",
    cta: {
      label: "Specifications and resources",
      href: "https://support.nabucasa.com/hc/en-us/articles/40528929207453#connectivity",
    },
  },
  {
    question: "What app do I use to play music?",
    answer:
      "<p>Music Assistant, which is free. It discovers Connect AUX-2 automatically as a Sendspin player.</p>",
    cta: {
      label: "Install Music Assistant",
      href: "https://music-assistant.io/installation/",
    },
  },
  {
    question: "Which streaming services are supported?",
    answer:
      "<p>Any service that Music Assistant supports. Music Assistant plays from streaming services and from your own music files.</p>",
    cta: {
      label: "Music Assistant music sources",
      href: "https://music-assistant.io/music-providers/",
    },
  },
  {
    question: "How do I connect AUX-2 with my existing stereo or speakers?",
    answer:
      "<p>With any stereo, AV receiver, or powered speakers that have an auxiliary input. It doesn’t amplify, so unpowered speakers need an audio amplifier.</p>",
    cta: {
      label: "Play your streaming services on your stereo",
      href: "https://www.nabucasa.com/hardware/aux-2/audio/",
    },
  },
  {
    question: "Can it play in sync with my other speakers?",
    answer:
      "<p>Yes. Music Assistant can group speakers to play in sync, including AirPlay and some Sonos speakers.</p>",
    cta: {
      label: "Music Assistant groups",
      href: "https://music-assistant.io/faq/groups/",
    },
  },
  {
    question: "How is it powered?",
    answer:
      "<p>By USB-C (5 V, 2 A) or Power over Ethernet (802.3af or better), one source at a time.</p>",
    cta: {
      label: "Power and network options",
      href: "https://support.nabucasa.com/hc/en-us/articles/40528734420253",
    },
  },
  {
    question: "Does AUX-2 connect via Wi-Fi or Ethernet?",
    answer:
      "<p>Either one. Wi-Fi is 2.4 GHz only. Wired is recommended for the most reliable link.</p>",
    cta: {
      label: "Power and network options",
      href: "https://support.nabucasa.com/hc/en-us/articles/40528734420253",
    },
  },
  {
    question: "Can Home Assistant turn on my receiver or change its volume?",
    answer:
      "<p>Yes, if the receiver has an RS-232 serial port and a Home Assistant integration.</p>",
    cta: {
      label: "Control your TV and AV receiver from Home Assistant",
      href: "https://www.nabucasa.com/hardware/aux-2/tv/",
    },
  },
];
