---
name: create-blog-post
description: Use this if the user wants to convert a blog post from Google Docs markdown to the format used in the Home Assistant website.
---

# Create Blog Post

Convert a draft markdown file into a properly formatted Home Assistant blog post.

## Usage

Place your draft blog post markdown file in the project root `create-blog-post/` directory (e.g., `/workspaces/home-assistant.io/create-blog-post/`), then run:

```shell
/create-blog-post
```

## What This Skill Does

Automates conversion of a draft markdown file with metadata into a production-ready Home Assistant blog post:
- Extracts metadata (author, date, categories, OG fields)
- Processes hero image and any additional images
- Converts external links to HTML `<a>` tags with `target="_blank"`
- Formats content (removes bold from headings, fixes link references)
- Creates properly formatted blog post in `source/_posts/` with Jekyll front matter

## Required Files in `create-blog-post/` Directory

1. **Draft markdown file** (any .md filename)
2. **`art.webp`** - Hero/OG image (required)
3. **`image2.png`, `image3.png`, etc.** - Additional images (optional, will be converted to WebP)

## Draft File Format

```markdown
# Blog metadata

**Author:** Author Name

**Date:** DD-MM-YYYY

**URL slug:** custom-url-slug (optional - auto-generated from title if omitted)

**Category (see [current list](https://www.home-assistant.io/blog/)):**
Category Name (or comma-separated for multiple: Category1, Category2)

**OG title:** (Usually same as the blog title, visibility mostly limited to 50-60 characters)

**OG / Meta description:** Description text (120-158 characters)

---

Your Blog Title
![][image1]

Your intro paragraph here...

Rest of content...
```

**Note:** The `![][image1]` reference should appear directly under the title. This will be replaced with the `art.webp` hero image.

## Output

Creates a production-ready blog post at:
- `source/_posts/YYYY-MM-DD-slug.markdown` - The formatted blog post
- `source/images/blog/YYYY-MM-slug/art.webp` - OG/hero image (moved from create-blog-post/)
- `source/images/blog/YYYY-MM-slug/image2.webp`, `image3.webp`, etc. - Additional images (converted from PNGs)

## Conversion Process

### 1. Parse Metadata
- Extract author, date, categories (convert to YAML list), URL slug, OG fields
- Auto-generate slug from title if not provided (lowercase, hyphens for spaces)

### 2. Process Images
**Hero image (`art.webp`):**
- Move to `source/images/blog/YYYY-MM-slug/art.webp`
- Insert after front matter as: `<img src="/images/blog/YYYY-MM-slug/art.webp" alt="Blog Title" style="border: 0;box-shadow: none;">`
- CRITICAL: Use double quotes for all HTML attributes (prevents breaking on apostrophes in alt text)
- Alt text uses the OG title or blog title
- No wrapper tags (no `<p>` tag)

**Additional images (if any):**
- Find `image2.png`, `image3.png`, etc. in `create-blog-post/` directory
- Convert to WebP: `cwebp -resize 900 0 -q 85 input.png -o output.webp`
- Move to `source/images/blog/YYYY-MM-slug/`
- Update references in content

### 3. Transform Links
**External links** (different domains/subdomains):
- Convert to: `<a href="URL" target="_blank" rel="noopener">text</a>`
- Includes: `my.home-assistant.io`, `partner.home-assistant.io`, etc.

**Internal links** (www.home-assistant.io only):
- Keep as Markdown links: `[text](/path)`

### 4. Clean Content
- **Headings**: Remove bold formatting (`## **Title**` → `## Title`)
- **Heading levels**: If content starts with H1 (`#`), demote all headings one level (content should start at H2)
- **Backticks**: Strip erroneous `\`` characters (preserve code blocks/inline code)

### 5. Build Blog Post
- Create `source/_posts/YYYY-MM-DD-slug.markdown`
- Jekyll front matter (layout, title, description, date, date_formatted, author, categories, og_image)
- Hero image (no wrapper)
- Intro paragraph
- `<!--more-->` tag after first paragraph
- Remaining content

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

## Important Notes

**Image references:**
- Draft: `![][image1]` (directly under title) → Output: `art.webp` hero image
- Draft: `![][image2]` → Look for `image2.png`, convert to `image2.webp`
- Draft: `![][image3]` → Look for `image3.png`, convert to `image3.webp`

**Requirements:**
- Hero image reference MUST appear directly under the blog title
- `cwebp` tool required for PNG→WebP conversion (install: `sudo apt-get install -y webp`)

**Output format:**
- Filename: `YYYY-MM-DD-slug.markdown`
- Image directory: `source/images/blog/YYYY-MM-slug/`
- `<!--more-->` tag automatically placed after first paragraph
- Categories in YAML list format (even single category)

**Link handling:**
- Only `www.home-assistant.io` and `home-assistant.io` stay as Markdown links
- All other domains/subdomains → HTML `<a>` tags with `target="_blank" rel="noopener"`
