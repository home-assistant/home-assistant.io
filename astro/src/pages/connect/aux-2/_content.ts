// Specifications and FAQ of the Connect AUX-2 page, from the Figma file
// "Connect AUX-2" ("Specs", node 2002:31255; "FAQ", node 2002:36190).
// The leading underscore keeps this file out of the page routes.

// TODO: the dimensions and weights are empty placeholders in the Figma
// file; fill them in once known.
export const specs = [
  {
    title: "Dimensions and weight",
    items: [
      { label: "Device", value: ["… × … × … mm", "… g"] },
      { label: "With box", value: ["… × … × … mm", "… g"] },
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
      // TODO: Figma says "Digital-to-Audio"; a DAC is a digital-to-analog
      // converter. Confirm with the product team.
      { label: "Digital-to-Audio (DAC) chip", value: ["TI PCM5122"] },
      {
        label: "Power",
        value: ["USB-C", "2A (or higher) / 5 V DC", "Power-over-Ethernet (802.3af)"],
      },
      {
        label: "Audio",
        details: [
          {
            term: "Connectivity",
            value: ["Combined optical (S/PDIF) and analog audio 3.5mm port"],
          },
          {
            term: "Analogue audio capabilities",
            value: ["24-bit/48kHz", "Stereo Audio DAC with 100dB SN"],
          },
          {
            term: "Digital audio capabilities",
            value: ["24-bit/48kHz", "Stereo PCM lossless audio"],
          },
          {
            term: "Home Assistant support",
            value: [
              "Supported (unsynchronized)",
              "Stream announcements, radio, URL streams, and files in your media library",
            ],
          },
          {
            term: "Synchronized whole home audio",
            value: ["Supported (Music Assistant via Sendspin)"],
          },
          {
            term: "Internal audio codec support",
            value: ["FLAC, MP3, OPUS, and WA"],
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
              "*Some devices may require converter cables (ex. DB9/RJ9/RJ44/MiniDIN)",
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
            value: ["USB-A data for Connect ZBT-1/ZBT-2/ZWA-2"],
          },
        ],
      },
      {
        label: "Connectivity",
        details: [
          { term: "Wireless", value: ["Wi-Fi, Bluetooth"] },
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
          "0 °C to 50 °C",
          "32 °F to 104 °F",
          "Humidity: non-condensing",
          "Keep in a dry, not excessively dusty, environment to avoid damage to the unit.",
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

// TODO: the Figma file has placeholder questions ("Can I speak my
// mind?") and one placeholder answer; replace with the real FAQ. The
// other Connect pages read theirs from source/_data/product/connect/.
const placeholder = {
  question: "Can I speak my mind?",
  answer:
    "<p>You're always free to share your honest perspectives and constructive feedback about Home Assistant in your content. Creator Network members are also given the chance to offer feedback about the monthly changes directly to the team before it releases.</p>",
};

export const faq = Array.from({ length: 5 }, () => placeholder);
