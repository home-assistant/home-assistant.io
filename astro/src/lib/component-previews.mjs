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
  return Object.entries(fixtureModules)
    .map(([path, mod]) => {
      const data = mod.default ?? {};
      const componentPath = path.replace(/\.fixtures\.mjs$/, ".astro");
      const fileName = path.split("/").pop().replace(".fixtures.mjs", "");
      return {
        slug: fileName.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
        name: data.title ?? fileName,
        description: data.description,
        variants: data.variants ?? [],
        Component: componentModules[componentPath]?.default,
        path: componentPath.replace("../", "src/"),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
