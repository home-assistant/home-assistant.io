"use strict";

// Checks the `ha_categories` front matter of integration pages against
// the integration categories in source/_data/integration_categories.json,
// with the same rules hassfest applies to the `categories` manifest key.

const fs = require("fs");
const path = require("path");
const YAML = require("yaml");

const CATEGORIES_FILE = "source/_data/integration_categories.json";
const MAX_CATEGORIES = 3;

function loadKnownCategories() {
  const categories = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", CATEGORIES_FILE), "utf8")
  );

  const known = new Set();
  for (const category of categories) {
    known.add(category.slug);
    for (const subcategory of category.subcategories) {
      known.add(`${category.slug}.${subcategory.slug}`);
    }
  }

  return known;
}

function lintHaCategories() {
  const known = loadKnownCategories();

  return (tree, file) => {
    if (!file.path || !file.path.includes("source/_integrations/")) {
      return;
    }

    const frontmatter = tree.children.find((node) => node.type === "yaml");
    if (!frontmatter) {
      return;
    }

    const categories = YAML.parse(frontmatter.value)?.ha_categories;
    if (categories === undefined) {
      return;
    }

    const report = (reason) =>
      file.message(reason, frontmatter, "remark-lint:ha-categories");

    if (
      !Array.isArray(categories) ||
      categories.length === 0 ||
      categories.length > MAX_CATEGORIES
    ) {
      report("`ha_categories` needs one to three categories");
      return;
    }

    const seen = new Set();
    for (const category of categories) {
      if (seen.has(category)) {
        report(`Duplicate category \`${category}\` in \`ha_categories\``);
      }
      seen.add(category);

      if (!known.has(category)) {
        report(
          `Unknown category \`${category}\` in \`ha_categories\`, see ${CATEGORIES_FILE} for the known categories`
        );
      }

      const [parent, subcategory] = String(category).split(".", 2);
      if (subcategory && categories.includes(parent)) {
        report(
          `Category \`${parent}\` is implied by its subcategory \`${category}\`, remove \`${parent}\``
        );
      }
    }
  };
}

module.exports = lintHaCategories;
