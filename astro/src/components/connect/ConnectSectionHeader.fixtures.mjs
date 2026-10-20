// Fixtures for the Connect section header, with the copy of the AUX-2
// page's "Audio and so much more" section. White and gray on the page's
// black, so it renders on black here.
//
// Not a port of a Jekyll element, so there is no `liquid` source.
export default {
  title: "Connect section header",
  wide: true,
  description:
    "Centered heading and lead text that open a section of a Connect " +
    "product page. Larger from 1140px.",
  variants: [
    {
      name: "AUX-2",
      dark: true,
      props: { title: "Audio and so much more" },
      slot:
        "Plug in, or wirelessly connect, this box to devices around the " +
        "home to bring them into Home Assistant.",
    },
  ],
};
