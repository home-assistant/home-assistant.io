---
name: create-blog-post
description: Use this if the user wants to convert a blog post from Google Docs markdown to the format used in the Home Assistant website.
---

# Create Blog Post

Convert a draft markdown file into a properly formatted Home Assistant blog post.

## Usage

```
/create-blog-post <path-to-draft-file>
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

**OG image** (optional):
(Image path or base64)

**OG title** (optional):
Title text

**OG description** (optional):
Description text

---

# Your Blog Title

Your blog content here...
```

## Output

Creates a production-ready blog post at:
- `source/_posts/YYYY-MM-DD-slug.markdown` - The formatted blog post
- `source/images/blog/YYYY-MM-slug/art.webp` - Hero image (if provided)
- Any additional images extracted from base64 in the content

## Process

1. Read and parse the draft markdown file
2. Extract all metadata (author, date, categories, URL slug, OG fields) and convert categories to YAML list format
3. Determine URL slug: use custom slug if provided, otherwise auto-generate from blog title
4. Find and convert any base64 images to WebP:
   - Use `cwebp` to convert with `-resize 900 0 -q 85`
   - Save to `source/images/blog/YYYY-MM-slug/`
   - Replace base64 references with proper image paths
5. Convert relative HA links to absolute:
   - `/blog/...` → `https://www.home-assistant.io/blog/...`
   - `/integrations/...` → `https://www.home-assistant.io/integrations/...`
   - `/docs/...` → `https://www.home-assistant.io/docs/...`
6. Convert external links to HTML `<a>` tags with `target="_blank"`:
   - Any link that goes to a different domain or subdomain should be converted from Markdown to HTML `<a>` tag with `target="_blank" rel="noopener"`
   - Format: `<a href="URL" target="_blank" rel="noopener">link text</a>`
   - Only links to `www.home-assistant.io` or `home-assistant.io` (the current site) should remain as Markdown links
   - All subdomains like `my.home-assistant.io`, `works-with.home-assistant.io`, etc. should be converted to `<a>` tags with `target="_blank" rel="noopener"`
7. Create blog post file with proper structure:
   - Front matter with all fields
   - Hero image after front matter
   - Intro paragraph
   - `<!--more-->` tag
   - Rest of content
8. Verify the blog post structure matches existing posts

## Example

```bash
/create-blog-post "/workspaces/home-assistant.io/draft-partner-update.md"
```

Would create:
- `source/_posts/2026-01-13-partner-update.markdown`
- `source/images/blog/2026-01-partner/art.webp`

## Notes

- If `cwebp` is not installed, will prompt to install: `sudo apt-get install -y webp`
- Hero image should be provided as OG image or as an image file in the same directory
- The skill will clean up metadata sections and formatting issues
- Always adds `<!--more-->` after the first paragraph for proper blog excerpts
- Follows the exact format of existing Home Assistant blog posts
- **URL slug** is optional - if not provided, it will be auto-generated from the blog title by converting to lowercase and replacing spaces with hyphens
- **Categories** are automatically converted to YAML list format in the front matter. Single category becomes `categories:\n  - Announcements`, multiple categories (comma-separated in metadata) become `categories:\n  - Category1\n  - Category2`
- **External links** (links to any domain or subdomain except www.home-assistant.io) should be converted to HTML `<a>` tags with `target="_blank" rel="noopener"` to open in a new tab. Format: `<a href="URL" target="_blank" rel="noopener">link text</a>`. This includes subdomains like my.home-assistant.io, works-with.home-assistant.io, etc. Only links to www.home-assistant.io or home-assistant.io should remain as Markdown links
