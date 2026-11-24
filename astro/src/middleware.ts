// Runs on every page Astro builds (and serves in dev): outgoing links
// open in a new tab, as src/lib/external-links.mjs describes.
import { defineMiddleware } from "astro:middleware";
import { outgoingLinks } from "./lib/external-links.mjs";

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  if (!response.headers.get("content-type")?.includes("text/html")) {
    return response;
  }
  return new Response(outgoingLinks(await response.text()), response);
});
