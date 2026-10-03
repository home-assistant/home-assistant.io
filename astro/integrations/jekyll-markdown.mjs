import { pathToFileURL } from "node:url";
import { parseFrontmatter } from "astro/markdown";

// Astro only treats `.md` files as Markdown content, while this site's
// content uses Jekyll's `.markdown` extension (enforced by CI). This
// integration registers identical Markdown handling for `.markdown`
// files, so both stacks read the same content files in place during the
// migration. It mirrors Astro's built-in Markdown content entry type
// (astro/dist/vite-plugin-markdown/content-entry-type.js), which is not
// exported publicly — revisit if that changes, or when the migration is
// complete and the extension convention is up for discussion.
export default function jekyllMarkdown() {
  return {
    name: "jekyll-markdown",
    hooks: {
      "astro:config:setup": (params) => {
        params.addContentEntryType({
          extensions: [".markdown"],
          async getEntryInfo({ contents }) {
            const parsed = parseFrontmatter(contents);
            return {
              data: parsed.frontmatter,
              body: parsed.content.trim(),
              slug: parsed.frontmatter.slug,
              rawData: parsed.rawFrontmatter,
            };
          },
          handlePropagation: true,
          async getRenderFunction(config) {
            const { markdown, image } = config;
            const processor = await markdown.processor.createRenderer({
              image,
              syntaxHighlight: markdown.syntaxHighlight,
              shikiConfig: markdown.shikiConfig,
              gfm: markdown.gfm,
              smartypants: markdown.smartypants,
            });
            return async function renderToString(entry) {
              const result = await processor.render(entry.body ?? "", {
                frontmatter: entry.data,
                fileURL: entry.filePath
                  ? pathToFileURL(entry.filePath)
                  : undefined,
              });
              return {
                html: result.code,
                metadata: {
                  ...result.metadata,
                  imagePaths: result.metadata.localImagePaths.concat(
                    result.metadata.remoteImagePaths,
                  ),
                },
              };
            };
          },
        });
      },
    },
  };
}
