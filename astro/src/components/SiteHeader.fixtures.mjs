// Fixtures for the site header. The version badge takes its data from
// props: on the live site that comes from `current_major_version`,
// `current_minor_version`, `current_patch_version` and `date_released`
// in `_config.yml`, plus the newest post in the `Core` category.
//
// The header renders in normal flow here. On the live site the page
// layout makes it `position: fixed` so content scrolls underneath.
export default {
  title: "Site header",
  // Full-width component: give it a whole row in the component browser.
  wide: true,
  description:
    "Logo, version badge, main navigation, search mount point and the " +
    "\u201cGet started\u201d call to action. Collapses into a menu panel below 1140px.",
  variants: [
    {
      name: "default",
      props: {
        pathname: "/",
        version: "2026.9.2",
        versionUrl: "/blog/2026/09/02/release-20269/",
        releasedOn: "2026-09-11",
      },
      liquid: "{% include site/header.html %}",
    },
    {
      name: "documentation active",
      props: {
        pathname: "/docs/automation/",
        version: "2026.9.2",
        versionUrl: "/blog/2026/09/02/release-20269/",
        releasedOn: "2026-09-11",
      },
    },
    {
      name: "get started active",
      props: {
        pathname: "/installation/",
        version: "2026.9.2",
        versionUrl: "/blog/2026/09/02/release-20269/",
        releasedOn: "2026-09-11",
      },
    },
    {
      name: "dark, over a hero image",
      props: {
        pathname: "/",
        dark: true,
        version: "2026.9.2",
        versionUrl: "/blog/2026/09/02/release-20269/",
        releasedOn: "2026-09-11",
      },
    },
    {
      name: "without a version badge",
      props: { pathname: "/blog/" },
    },
  ],
};
