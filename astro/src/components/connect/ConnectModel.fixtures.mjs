// Fixtures for the Connect model, with the AUX-2 page's line drawing.
// Drawn for the page's black, so it renders on black here, at the
// page's 16:9 (from 768px).
//
// Not a port of a Jekyll element, so there is no `liquid` source.
import lineModel from "../../assets/connect/aux-2/aux-2-line.glb?url";

export default {
  title: "Connect model",
  description:
    "A product's 3D model as a white line drawing on black, turned by " +
    "dragging sideways.",
  variants: [
    {
      name: "AUX-2",
      dark: true,
      props: {
        src: lineModel,
        label: "Line drawing of the Connect AUX-2, its ports side to the front",
        style: "aspect-ratio: 16 / 9",
      },
    },
  ],
};
