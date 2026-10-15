import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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

export const collections = { help };
