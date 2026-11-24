// Fixtures for the livestream card. It fetches the channel's stream
// from the Open Home Foundation Web API in the browser and stays hidden
// when there is none, so this preview is empty unless the Home
// Assistant channel has a stream live, coming up within 48 hours, or
// ended within the last 12.
export default {
  title: "Livestream card",
  description:
    "A channel's live, upcoming or just-ended stream, with a countdown " +
    "or a muted embed. Hidden when there is no stream.",
  variants: [
    {
      name: "Home Assistant channel",
      props: { slug: "home-assistant" },
    },
  ],
};
