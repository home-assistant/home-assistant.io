// Fixtures for the art-directed photo, with the AUX-2 page's "Best spot
// in the house" photo: Figma's zoomed-in desktop crop from 1140px, the
// whole photo below.
//
// Not a port of a Jekyll element, so there is no `liquid` source.
import bestSpot from "../assets/connect/aux-2/best-spot.webp";
import bestSpotMobile from "../assets/connect/aux-2/best-spot-mobile.webp";

export default {
  title: "Art-directed image",
  description:
    "A photo with a separate phone crop below 1140px. Resize the window " +
    "to see the crop change.",
  variants: [
    {
      name: "Desktop and phone crops",
      props: {
        image: bestSpot,
        mobileImage: bestSpotMobile,
        alt: "The Connect AUX-2 with a Connect ZWA-2 antenna plugged into its USB port",
        widths: [960, bestSpot.width],
        sizes: "40rem",
        mobileWidths: [480, 960, 1440, bestSpotMobile.width],
        mobileSizes: "100vw",
      },
    },
  ],
};
