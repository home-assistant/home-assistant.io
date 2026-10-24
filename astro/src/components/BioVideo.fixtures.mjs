// Fixtures for a YouTube video on the link-in-bio page (/bio/). Not a
// port of a Jekyll content tag, so there is no `liquid` source.
export default {
  title: "BioVideo",
  description: "A YouTube video or livestream, shown like an embedded player; opens YouTube.",
  variants: [
    {
      name: "upcoming livestream",
      props: {
        label: "State of the Open Home 2026",
        url: "https://www.youtube.com/watch?v=XyAL1to3Lm4",
        note: "Livestream · Starts November 15 · 18:00 UTC",
        image: "https://i.ytimg.com/vi/XyAL1to3Lm4/hqdefault.jpg",
      },
    },
    {
      name: "past video",
      props: {
        label: "State of the Open Home 2026",
        url: "https://www.youtube.com/watch?v=XyAL1to3Lm4",
        note: "Livestream · October 10, 2026",
        image: "https://i.ytimg.com/vi/XyAL1to3Lm4/hqdefault.jpg",
      },
    },
  ],
};
