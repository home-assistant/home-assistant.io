// Fixtures for the "What the Heck?!" wordmark. It takes no props: the
// words are the campaign's.
//
// This is the CSS version. On the page, logo.js replaces it with the 3D
// one drawn with three.js, which needs the scripts the page loads; the
// component browser shows the fallback that stays when WebGL is not
// available.
export default {
  title: "WTH wordmark",
  wide: true,
  description:
    "The \u201cWhat the Heck?!\u201d lockup as live text, sized against the " +
    "window. The CSS fallback for the 3D wordmark on the page.",
  variants: [
    {
      name: "default",
      liquid: "{% include_relative components/_wordmark.html %}",
    },
  ],
};
