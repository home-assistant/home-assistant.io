---
name: create-blog-post
description: Use this if the user wants to convert a blog post from Google Docs markdown to the format used in the Home Assistant website.
---

# Create Blog Post

Convert a draft markdown file into a properly formatted Home Assistant blog post.

## Usage

Place your draft blog post markdown file in the project root `create-blog-post/` directory (e.g., `/workspaces/home-assistant.io/create-blog-post/`), then run:

```
/create-blog-post
```

## What This Skill Does

This skill automates the process of converting a draft markdown file with metadata into a production-ready Home Assistant blog post. It:

1. **Parses metadata** - Extracts author, date, categories, OG image/title/description from the draft
2. **Converts images** - Finds any base64 encoded images, converts them to WebP format (max 900px width), and saves them in the appropriate blog images directory
3. **Fixes links** - Converts any relative Home Assistant links to absolute URLs (e.g., `/integrations/foo` → `https://www.home-assistant.io/integrations/foo`)
4. **Creates blog post** - Generates a properly formatted blog post file in `source/_posts/` with:
   - Correct filename format: `YYYY-MM-DD-slug.markdown`
   - Complete Jekyll front matter with layout, title, description, date, author, categories (YAML list format), og_image
   - Hero image with proper styling
   - `<!--more-->` tag after the intro paragraph
   - Clean, production-ready content

## Expected Input Format

The draft file should contain:

```markdown
# Blog metadata

**Author:**
Author Name

**Date:**
DD-MM-YYYY

**URL slug:** (optional)
custom-url-slug

**Category (see [current list](https://www.home-assistant.io/blog/)):**
Category Name (or comma-separated: Category1, Category2)
*Note: Categories will be converted to YAML list format in the blog post front matter*

**OG title**:
Title text

**OG / Meta description**:
Description text

---

# Your Blog Title

Your blog content here...
```

## Output

Creates a production-ready blog post at:
- `source/_posts/YYYY-MM-DD-slug.markdown` - The formatted blog post
- `source/images/blog/YYYY-MM-slug/art.webp` - OG/hero image (moved from create-blog-post/)
- `source/images/blog/YYYY-MM-slug/image2.webp`, `image3.webp`, etc. - Additional images (converted from PNGs)

## Process

1. Read and parse the draft markdown file from project root `create-blog-post/` directory
2. Extract all metadata (author, date, categories, URL slug, OG fields) and convert categories to YAML list format
3. Determine URL slug: use custom slug if provided, otherwise auto-generate from blog title
4. Process images:
   - **OG image (image1)**:
     - Must be `art.webp` in the project root `create-blog-post/` directory
     - Must be the first image in content (directly under the title)
     - If no image under title, ERROR and stop conversion
     - Move to `source/images/blog/YYYY-MM-slug/art.webp`
     - Link in blog post as first image after front matter WITHOUT any wrapper tags (no `<p>` tag)
     - Use the blog title (from OG title or main blog title) as the alt text for the hero image
   - **Additional images (image2, image3, etc.)**:
     - Look for corresponding PNG files in project root `create-blog-post/` (e.g., `image2.png`, `image3.png`)
     - Convert each to WebP using `cwebp -resize 900 0 -q 85`
     - Move to `source/images/blog/YYYY-MM-slug/image2.webp`, etc.
     - Update references in blog post accordingly
5. Convert relative HA links to absolute:
   - `/blog/...` → `https://www.home-assistant.io/blog/...`
   - `/integrations/...` → `https://www.home-assistant.io/integrations/...`
   - `/docs/...` → `https://www.home-assistant.io/docs/...`
6. Convert external links to HTML `<a>` tags with `target="_blank"`:
   - Any link that goes to a different domain or subdomain should be converted from Markdown to HTML `<a>` tag with `target="_blank" rel="noopener"`
   - Format: `<a href="URL" target="_blank" rel="noopener">link text</a>`
   - Only links to `www.home-assistant.io` or `home-assistant.io` (the current site) should remain as Markdown links
   - All subdomains like `my.home-assistant.io`, `works-with.home-assistant.io`, etc. should be converted to `<a>` tags with `target="_blank" rel="noopener"`
7. Demote headings if needed:
   - Check if the first heading in the content is H1 (`#`)
   - If yes, demote ALL headings by one level: `#` → `##`, `##` → `###`, etc.
   - If no (content already starts with H2 or lower), keep heading structure as-is
   - The blog title in the front matter is automatically rendered as H1, so content should start at H2
8. Remove bold formatting from headings:
   - Convert `## **Heading**` to `## Heading`
   - Remove any `**` or `__` from all heading levels (# through ######)
9. Remove any backticks from the content:
   - Strip out any `\`` characters that aren't part of code blocks or inline code
10. Create blog post file with proper structure:
   - Front matter with all fields
   - Hero image after front matter: `<img src="/images/blog/YYYY-MM-slug/art.webp" alt="Blog Title Here" style="border: 0;box-shadow: none;">` (IMPORTANT: Use double quotes for all HTML attributes to prevent issues with apostrophes in alt text; no wrapper tags, alt text uses blog title)
   - Intro paragraph
   - `<!--more-->` tag
   - Rest of content
11. Verify the blog post structure matches existing posts

## Example

1. Place in project root `create-blog-post/`:
   - `draft-partner-update.md` - Your draft file
   - `art.webp` - OG/hero image
   - `image2.png`, `image3.png` - Additional images (if any)
2. Run `/create-blog-post`

This would create:
- `source/_posts/2026-01-13-partner-update.markdown`
- `source/images/blog/2026-01-partner/art.webp`
- `source/images/blog/2026-01-partner/image2.webp`, `image3.webp` (if additional images exist)

## Notes

- **Image workflow**:
  - `image1` in the draft = `art.webp` (OG/hero image, must exist in project root `create-blog-post/`)
  - `image2` in the draft = `image2.png` (converted to `image2.webp`)
  - `image3` in the draft = `image3.png` (converted to `image3.webp`)
  - And so on...
  - The first image MUST appear directly under the title or conversion will fail
  - Hero image alt text must use the blog title (from OG title or main title)
  - Hero image should NOT be wrapped in any tags (no `<p>` wrapper)
  - CRITICAL: Hero image HTML must use double quotes for all attributes (src, alt, style) to prevent breaking when alt text contains apostrophes
- If `cwebp` is not installed, will prompt to install: `sudo apt-get install -y webp`
- The skill will clean up metadata sections and formatting issues
- Always adds `<!--more-->` after the first paragraph for proper blog excerpts
- Follows the exact format of existing Home Assistant blog posts
- **URL slug** is optional - if not provided, it will be auto-generated from the blog title by converting to lowercase and replacing spaces with hyphens
- **Categories** are automatically converted to YAML list format in the front matter. Single category becomes `categories:\n  - Announcements`, multiple categories (comma-separated in metadata) become `categories:\n  - Category1\n  - Category2`
- **External links** (links to any domain or subdomain except www.home-assistant.io) should be converted to HTML `<a>` tags with `target="_blank" rel="noopener"` to open in a new tab. Format: `<a href="URL" target="_blank" rel="noopener">link text</a>`. This includes subdomains like my.home-assistant.io, works-with.home-assistant.io, etc. Only links to www.home-assistant.io or home-assistant.io should remain as Markdown links
