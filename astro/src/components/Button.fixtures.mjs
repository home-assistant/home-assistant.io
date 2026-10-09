// Fixtures for the call-to-action button, after the "Call to actions"
// component set in the Figma file "Design System - Marketing Website"
// (node 15:173). Each variant is one color scheme on one background,
// laid out like the Figma sheet: a row of enabled buttons and a row of
// disabled ones, each with Fill and Outline in the three layouts
// (label, label and arrow, arrow only). Hover, active and focus are
// live CSS states: point at, press or tab to a button to see them. The
// size follows the window, so the mobile size shows below 480px.
// Variants marked `dark` render on black, like the Figma file's dark
// frames.
//
// Not a port of a Jekyll element, so there is no `liquid` source.
const schemes = ["primary", "secondary", "tertiary", "green", "connect-line"];
const label = "Get started";

const row = (props) =>
  [false, true].flatMap((outline) => [
    { props: { ...props, outline }, slot: label },
    { props: { ...props, outline, icon: true }, slot: label },
    { props: { ...props, outline, icon: true, label } },
  ]);

const grid = (props) => [row(props), row({ ...props, disabled: true })];

export default {
  title: "Button",
  description:
    "Call-to-action pill in five color schemes, fill or outline, with an " +
    "optional arrow. Mobile size below 480px.",
  wide: true,
  variants: schemes.flatMap((scheme) => [
    { name: scheme, rows: grid({ scheme }) },
    {
      name: `${scheme} on dark`,
      dark: true,
      rows: grid({ scheme, onDark: true }),
    },
  ]),
};
