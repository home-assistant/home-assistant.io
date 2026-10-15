// Shared discovery for the component browser pages: every
// src/components/**/<Name>.fixtures.mjs file becomes an entry,
// rendered with the sibling <Name>.astro component. Fixtures are pure
// data (see astro/README.md) so the same variants can drive the
// Jekyll/Astro golden-output parity tests later.
const fixtureModules = import.meta.glob("../components/**/*.fixtures.mjs", {
  eager: true,
});
const componentModules = import.meta.glob("../components/**/*.astro", {
  eager: true,
});

export function getComponentPreviews() {
  const entries = Object.entries(fixtureModules)
    .map(([path, mod]) => {
      const data = mod.default ?? {};
      const componentPath = path.replace(/\.fixtures\.mjs$/, ".astro");
      const fileName = path.split("/").pop().replace(".fixtures.mjs", "");
      // Slug from the whole path under components/, so fixtures in
      // nested directories cannot collide on their basename alone
      // (forms/TextField -> forms-text-field).
      const slug = path
        .replace(/^.*?\/components\//, "")
        .replace(/\.fixtures\.mjs$/, "")
        .split("/")
        .map((part) =>
          part.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
        )
        .join("-");
      return {
        slug,
        name: data.title ?? fileName,
        description: data.description,
        // Full-width components (header, footer) get a tile that spans
        // the whole browser row instead of one grid cell.
        wide: Boolean(data.wide),
        variants: data.variants ?? [],
        Component: componentModules[componentPath]?.default,
        path: componentPath.replace("../", "src/"),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const seen = new Map();
  for (const entry of entries) {
    if (seen.has(entry.slug)) {
      throw new Error(
        `Duplicate component preview slug "${entry.slug}": ` +
          `${seen.get(entry.slug)} and ${entry.path}. Rename one of ` +
          `the components so every preview gets a unique route.`,
      );
    }
    seen.set(entry.slug, entry.path);
  }
  return entries;
}
