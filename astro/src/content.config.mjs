import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";
import servedRoutes from "../served-routes.json" with { type: "json" };

// Collections read the existing Jekyll content in `source/` in place.
// Content files are shared between both stacks during the migration:
// same paths, same front matter, same syntax.

const help = defineCollection({
  loader: glob({ base: "../source/help", pattern: "**/*.markdown" }),
  schema: z
    .object({
      title: z.string(),
      description: z.string().optional(),
      sidebar: z.boolean().optional(),
      related: z
        .array(
          z.object({
            docs: z.string().optional(),
            url: z.string().optional(),
            title: z.string(),
          })
        )
        .optional(),
    })
    .passthrough(),
});

// Pages served by Astro on the website: one Markdown page per route in
// served-routes.json, which the Rakefile also reads to publish these
// routes over Jekyll's (see astro/README.md). A route "tos/" is the
// file source/tos/index.markdown.
const pages = defineCollection({
  loader: glob({
    base: "../source",
    pattern: servedRoutes.map((route) => `${route}index.markdown`),
  }),
  schema: z
    .object({
      title: z.string(),
      description: z.string().optional(),
    })
    .passthrough(),
});

// Products sold through distributors, keyed by product ("zbt-2",
// "aux-2"): the data behind the buy dialog (BuyDialog.astro), read
// from the same file as Jekyll's `custom/buy-dialog.html`. `name` may
// hold inline HTML (<strong>Home Assistant</strong> ...). `new` adds
// the "New product!" notice. Each distributor appears under its
// `ship_to` region.
const products = defineCollection({
  loader: file("../source/_data/products.yml"),
  schema: z.object({
    name: z.string(),
    new: z.boolean().optional(),
    distributors: z
      .array(
        z.object({
          name: z.string(),
          ship_from: z.string(),
          ship_to: z.string(),
          url: z.string(),
          logo: z.string().optional(),
        })
      )
      .default([]),
  }),
});

// The link-in-bio page (src/pages/bio/index.astro) is described by one
// data file, source/_data/bio.yml. Its rules are checked by
// src/lib/bio.mjs, which names the key at fault, so the schema here
// accepts any map.
const bio = defineCollection({
  loader: glob({ base: "../source/_data", pattern: "bio.yml" }),
  schema: z.object({}).passthrough(),
});

export const collections = { help, pages, products, bio };
