// Fixtures for the buy dialog. A modal shows nothing until it is
// opened, so the variant brings its own Buy button (`before`); opening
// the stage with `#buy` in the address opens it too. One variant only:
// the page script drives the first dialog on the page. ZWA-2 has a
// full distributor list; the AUX-2 list is still empty.
export default {
  title: "Buy dialog",
  description:
    "Where to buy a product: its distributors by shipping region, " +
    "from source/_data/products.yml.",
  variants: [
    {
      name: "ZWA-2",
      props: { product: "zwa-2" },
      before:
        '<button type="button" data-buy-dialog data-buy-context="preview">' +
        "Open the buy dialog</button>",
      liquid: '{% include custom/buy-dialog.html product="zwa-2" %}',
    },
  ],
};
