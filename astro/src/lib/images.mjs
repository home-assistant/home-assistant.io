// Resized images from Netlify's image CDN (/.netlify/images), for
// thumbnails that would otherwise be a large image shrunk by the
// browser. Works on deploys and with `netlify dev`, not `astro dev`.
//
// The CDN resizes images from this site, and from the hosts below,
// which netlify.toml allows under [images] remote_images. Keep the two
// lists in step: images.test.mjs checks that every host here is
// allowed there. An image from any other host is used as it is.
export const REMOTE_IMAGE_HOSTS = [
  // Open Graph images for `image: auto` links.
  "assets.openhomefoundation.org",
  // YouTube video thumbnails.
  "i.ytimg.com",
  // Newsletter edition images.
  "newsletter.openhomefoundation.org",
  // The merch store.
  "store.openhomefoundation.org",
];

// The image at `width` pixels wide, or null when the CDN can't resize it.
export function resized(image, width) {
  if (!image) return null;
  if (!/^\/(?!\/)/.test(image)) {
    let url;
    try {
      url = new URL(image);
    } catch {
      return null;
    }
    if (url.protocol !== "https:" || !REMOTE_IMAGE_HOSTS.includes(url.hostname)) return null;
  }
  return `/.netlify/images?url=${encodeURIComponent(image)}&w=${width}`;
}
