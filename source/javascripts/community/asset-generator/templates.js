const ASSETS = "/images/community/asset-generator";

const INK = "#1D2126";
const BYLINE_INK = "#09202E";

export const TEMPLATES = [
  {
    id: "community-meetup",
    name: "Community meetup",
    width: 1080,
    height: 1080,

    defaultSize: "square",
    sizes: [
      { value: "square", label: "Square — 1080 × 1080", height: 1080 },
      { value: "portrait", label: "Portrait — 1080 × 1350", height: 1350 },
    ],

    layers: [
      {
        kind: "image",
        src: `${ASSETS}/gradient.png`,
        x: 0,
        y: 0,
        w: 1080,
        h: 1080,
        cover: true,
        backdrop: true,
        alt: "",
      },
      {
        kind: "image",
        src: `${ASSETS}/illustration.svg`,
        x: -444,
        y: -179,
        w: 2361,
        h: 1272,
        backdrop: true,
        scaleWithSize: true,
        alt: "",
      },

      {
        kind: "image",
        x: 69,
        y: 483,
        h: 73,
        shiftOnCollapse: true,
        select: {
          field: "logo",
          label: "Project logo",
          default: "ha",
          options: [
            { value: "ha", label: "Home Assistant", src: `${ASSETS}/logo-ha.svg` },
            { value: "esphome", label: "ESPHome", src: `${ASSETS}/logo-esphome.svg` },
            { value: "ma", label: "Music Assistant", src: `${ASSETS}/logo-ma.svg` },
          ],
        },
      },

      {
        kind: "text",
        text: "Community Meetup",
        x: 58,
        y: 587,
        w: 972,
        font: { weight: 700, size: 120, lineHeight: 105.6, letterSpacing: -1.2 },
        color: INK,
        titleCase: true,
        shiftOnCollapse: true,
      },

      {
        kind: "row",
        shiftOnCollapse: true,
        x: 68,
        y: 842,
        gap: 10,
        padding: 16,
        radius: 8,
        background: "#16F3BE",
        align: "center",
        font: { weight: 400, size: 38, lineHeight: 33.44, letterSpacing: -0.38 },
        color: INK,
        titleCase: true,

        datePicker: { label: "Event date", default: "2026-05-27" },
        children: [
          { kind: "text", editable: true, field: "weekday", label: "Weekday", default: "Wednesday,", datePart: "weekday" },
          { kind: "text", editable: true, field: "date", label: "Date", default: "May 27", font: { weight: 700 }, datePart: "monthday" },
          { kind: "text", text: "|" },
          { kind: "text", editable: true, field: "city", label: "City", default: "Rome" },
        ],
      },

      {
        kind: "row",
        optional: true,
        optionLabel: 'Show the "organized by" line',
        defaultOn: true,

        collapseShift: 104,
        x: 68,
        y: 982,
        gap: 8,
        align: "center",
        font: { weight: 400, size: 30, lineHeight: 28.8, letterSpacing: -0.3 },
        color: BYLINE_INK,
        children: [
          { kind: "text", text: "An event organized by " },
          { kind: "text", editable: true, field: "organizer", label: "Organizer", default: "Organizer", font: { weight: 700 } },
        ],
      },
    ],
  },
];
