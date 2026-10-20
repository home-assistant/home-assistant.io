// Fixtures for the Connect product bar, with the links of the AUX-2
// page. The bar is white on transparent, drawn over the hero photo, so
// it renders on black here. Below 1140px the links and the Buy button
// fold into the menu behind the round button.
//
// Not a port of a Jekyll element, so there is no `liquid` source.
export default {
  title: "Connect product bar",
  // Full-width component: render it edge to edge in the component browser.
  wide: true,
  description:
    "Product name, section links and a Buy button for Connect product " +
    "pages. Folds into a menu below 1140px.",
  variants: [
    {
      name: "AUX-2",
      dark: true,
      props: {
        product: "Connect AUX-2",
        links: [
          { label: "Features", href: "#features" },
          { label: "Specs", href: "#specs" },
          { label: "FAQ", href: "#faq" },
        ],
        buyHref: "#buy",
      },
    },
  ],
};
