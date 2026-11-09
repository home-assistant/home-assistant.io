// Fixtures for the Connect price section, with the AUX-2 page's prices
// (not final). Not a port of a single Jekyll element, so there is no
// `liquid` source; it replaces source/connect/*/components/_buy.html.
export default {
  title: "Connect price",
  wide: true,
  description: "Prices, Buy button and price terms on a blue glow.",
  variants: [
    {
      name: "AUX-2",
      dark: true,
      props: { usd: "$69", eur: "€59", buyHref: "#buy" },
      slot: "Make your old gear new today for just",
    },
  ],
};
