// Fixtures for the demo phone. Its only usage is the homepage hero,
// where it sits on the hero's blue gradient: the white double bezel is
// drawn for that background and is hard to see on a white page.
export default {
  title: "Demo phone",
  // Switches between the live frame and the screenshot at the desk
  // breakpoint, so it needs the window's width to show either.
  wide: true,
  description:
    "Live demo in a phone frame from 1140px, loaded on first " +
    "interaction; a screenshot linking to the demo below that.",
  variants: [
    {
      name: "default",
    },
  ],
};
