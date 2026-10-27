import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
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

export const collections = { help, pages };
