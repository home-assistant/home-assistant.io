---
name: create-blog-post
description: Use this if the user wants to convert a blog post from Google Docs markdown to the format used in the Home Assistant website, or wants to publish an externally linked (crosspost) blog post that redirects to an article hosted on another site.
---

# Create Blog Post

Convert a draft markdown file into a properly formatted Home Assistant blog post.

There are two kinds of blog posts this skill handles:

- **Standard blog posts** — full content hosted on the Home Assistant website, converted from a Google Docs markdown draft. This is the default path, described in the sections below.
- **Externally linked (crosspost) blog posts** — a short teaser that redirects readers to an article hosted on another site (for example, the Open Home Foundation blog). If the user asks to "publish a blog that is externally linked", "create a crosspost", "add an external blog post", or similar, follow the [Externally linked (crosspost) blog posts](#externally-linked-crosspost-blog-posts) section instead.

## Usage

Place your draft blog post markdown file in the project root `create-blog-post/` directory (e.g., `/workspaces/home-assistant.io/create-blog-post/`), then run:

```shell
/create-blog-post
```

## What This Skill Does

Automates conversion of a draft markdown file with metadata into a production-ready Home Assistant blog post:

- Extracts metadata (blog title, author, publish date, category, Social/OpenGraph fields)
- Removes "# Blog notes/preparations" section and lines with ☝️ emoji
- Converts `### **– Summary break / Read more –**` to `<!--more-->`
- Processes hero image and any additional images
- Converts external links to HTML `<a>` tags with `target="_blank"`
- Formats content (removes bold from headings, fixes link references)
- Creates properly formatted blog post in `source/_posts/` with Jekyll front matter

## Required Files in `create-blog-post/` Directory

1. **Draft markdown file** (any .md filename)
2. **`art.*`** - Hero/OG image (required, any common image format: `.webp`, `.png`, `.jpg`, `.jpeg`)
3. **`image2.*`, `image3.*`, etc.** - Additional images (optional, any common image format)

## Draft File Format

```markdown
# Metadata

**Blog title:** Your Blog Title

**Author:** Author Name

**Publish date:** DD-MM-YYYY

**Category:** Category Name

**Social/OpenGraph title** (Usually same as the blog title, visibility mostly limited to 50-60 characters)**:**
A short title.

**Social/OpenGraph description** (120-158 characters):
Influences SEO ranking. Include the main keyword, describe what readers will find, and give them a clear reason to click.

# Blog notes/preparations

☝️ Any lines with the pointer emoji can be removed during processing

# Blog content

![][image1]

Your intro paragraph here...

### **– Summary break / Read more –**

Rest of content...
```

**Notes:**

- The `![][image1]` reference should appear at the start of the "# Blog content" section. This will be replaced with the `art.webp` hero image.
- URL slug is optional and will be auto-generated from the blog title if not provided in metadata
- Lines beginning with ☝️ emoji are instructions and will be removed during processing
- The `### **– Summary break / Read more –**` marker will be converted to `<!--more-->`

## Output

Creates a production-ready blog post at:

- `source/_posts/YYYY-MM-DD-slug.markdown` - The formatted blog post
- `source/images/blog/YYYY-MM-slug/art.webp` - OG/hero image (moved from `create-blog-post/`)
- `source/images/blog/YYYY-MM-slug/image2.webp`, `image3.webp`, etc. - Additional images (converted from PNGs)

## Conversion Process

### 1. Pre-process Draft

Before doing anything else, strip out embedded base64 image data from the draft file using a shell command. **Do not read the draft file before this step** — the base64 data can make the file extremely large.

Google Docs markdown exports include image references like `![][image1]` in the content body, with corresponding base64 definitions at the bottom of the file in the format:

```text
[image1]: <data:image/png;base64,iVBORw0KGgo... (potentially megabytes of data)>
```

Run this `sed` command via the Bash tool to strip them in-place:

```shell
sed -i '/^\[image[0-9]*\]: <data:/d' "create-blog-post/draft.md"
```

- This removes all lines matching the base64 image definition pattern
- The `![][image1]` references in the content body are preserved — they will be replaced with proper image paths later
- Only after this command completes should you read the draft file

### 2. Parse Metadata

- Extract blog title, author, publish date, category (convert to YAML list), Social/OpenGraph title and description
- Auto-generate URL slug from blog title (lowercase, hyphens for spaces, remove special characters)
- Remove "# Blog notes/preparations" section and all content under it (up to "# Blog content")
- Remove all lines that start with ☝️ emoji (instruction lines)
- Convert `### **– Summary break / Read more –**` marker to `<!--more-->`

### 3. Process Images

Before processing images, ensure the `cwebp` tool is installed. If not, install it:

```shell
# Check if cwebp is available, install if missing
which cwebp || sudo apt-get install -y webp
```

**Hero image (`art.*`):**

- Find the `art` image in `create-blog-post/` (any extension: `.webp`, `.png`, `.jpg`, `.jpeg`)
- If the source is already `.webp`, copy it to `source/images/blog/YYYY-MM-slug/art.webp`
- If the source is any other format, convert to WebP: `cwebp -resize 1200 630 -q 85 input -o source/images/blog/YYYY-MM-slug/art.webp`
- The OG image must be exactly 1200x630 pixels — the source image should already be this size, so use `-resize 1200 630` to ensure correctness
- Replace `![][image1]` reference in "# Blog content" section with: `<img src="/images/blog/YYYY-MM-slug/art.webp" alt="Blog Title" style="border: 0;box-shadow: none;">`
- CRITICAL: Use double quotes for all HTML attributes (prevents breaking on apostrophes in alt text)
- Alt text uses the Social/OpenGraph title or blog title
- No wrapper tags (no `<p>` tag)

**Additional images (if any):**

- Find `image2.*`, `image3.*`, etc. in `create-blog-post/` (any extension: `.webp`, `.png`, `.jpg`, `.jpeg`)
- Convert to WebP with a max width of 900px: `cwebp -resize 900 0 -q 85 input -o output.webp` (the `0` for height preserves the aspect ratio)
- If the source is already `.webp`, still re-encode it with the resize: `cwebp -resize 900 0 -q 85 input.webp -o output.webp`
- Output to `source/images/blog/YYYY-MM-slug/image2.webp`, `image3.webp`, etc.
- Update references in content

### 4. Transform Links

**External links** (different domains/subdomains):

- Convert to: `<a href="URL" target="_blank" rel="noopener">text</a>`
- Includes: `my.home-assistant.io`, `partner.home-assistant.io`, etc.

**Internal links** (`www.home-assistant.io` only):

- Keep as Markdown links: `[text](/path)`

### 5. Device List (Works with Home Assistant posts only)

If the blog post category is `Works-with-Home-Assistant`, look for a section that lists certified/supported devices. Replace any manually written device list with the dynamic device list shortcode:

```liquid
{% include integrations/device_list.html brand="brandname" %}
```

- The `brand` value must match a brand in `source/_data/wwha_devices.json` (for example: `"eve"`, `"heatit"`, `"shelly"`, `"zooz"`)
- The brand name is typically the lowercase company/brand name from the draft
- If the draft contains a manually listed set of devices (often as a bullet list or table), replace that list with the shortcode
- Keep any introductory or closing text around the device list — only replace the list itself

### 6. Clean Content

- **Headings**: Remove bold formatting (`## **Title**` → `## Title`)
- **Heading levels**: If content starts with H1 (`#`), demote all headings one level (content should start at H2)
- **Backticks**: Strip erroneous `\`` characters (preserve code blocks/inline code)
- **Text content**: Do not change the author's wording, phrasing, or writing style. The blog text should stay as-is. If you spot obvious typos or locale spelling issues (such as British English instead of American English), do not fix them silently — collect them and ask the user for confirmation before applying any changes.
- **Emojis**: Preserve all emojis that appear in the blog content. Do not strip them out.
- **Apostrophes and quotes**: Convert straight apostrophes (`'`) and speech marks (`"`) in prose — including quoted statements, like in blockquotes — to their curly equivalents (`’`, `“`/`”`). Only apply this to body text — never to HTML attribute values, URLs, code blocks/inline code, or Liquid/Jekyll syntax.

### 7. Build Blog Post

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

- Draft: `![][image1]` (at start of "# Blog content" section) → Output: `art.webp` hero image (1200x630, OG image)
- Draft: `![][image2]` → Look for `image2.*` (any format), convert to `image2.webp` (max 900px wide)
- Draft: `![][image3]` → Look for `image3.*` (any format), convert to `image3.webp` (max 900px wide)
- Source images can be any common format (`.webp`, `.png`, `.jpg`, `.jpeg`) — all are converted/re-encoded to `.webp`

**Requirements:**

- Hero image reference should appear at the start of the "# Blog content" section
- `cwebp` tool is required — the skill will auto-install it via `sudo apt-get install -y webp` if not already present

**Content processing:**

- Remove "# Blog notes/preparations" section entirely
- Remove all lines starting with ☝️ emoji (instruction lines)
- Convert `### **– Summary break / Read more –**` to `<!--more-->`

**Device lists (Works with Home Assistant posts):**

- WWHA blog posts (category `Works-with-Home-Assistant`) typically include a list of certified devices in the draft (as bullet points, tables, or similar)
- Strip out the manually written device list entirely and replace it with: `{% include integrations/device_list.html brand="brandname" %}`
- The `brand` value must match an entry in `source/_data/wwha_devices.json` — verify the brand exists in that file before using it
- Keep any surrounding text that introduces or follows the device list (for example "Here's what's made the cut from Heatit:") — only replace the device list itself

**Output format:**

- Filename: `YYYY-MM-DD-slug.markdown`
- Image directory: `source/images/blog/YYYY-MM-slug/`
- Categories in YAML list format (even single category)

**Link handling:**

- Only `www.home-assistant.io` and `home-assistant.io` stay as Markdown links
- All other domains/subdomains → HTML `<a>` tags with `target="_blank" rel="noopener"`

## Externally linked (crosspost) blog posts

A crosspost is a short blog entry that does not host the full article. Instead, it shows a teaser and redirects the reader to an article hosted on another site (for example, the Open Home Foundation blog). Use this path when the user asks to publish an externally linked blog, add a crosspost, or link out to an article on another site.

Unlike a standard blog post, a crosspost has no draft file and no local images to process:

- The `crosspost` layout redirects visitors to the `external_url`.
- The Open Graph image is handled automatically. The `crosspost_og` plugin derives `og_image` from the `external_url` using the Open Home Foundation dynamic Open Graph endpoint (`https://assets.openhomefoundation.org/opengraph?url=<external_url>`). This shows the social image and the blog archive thumbnail immediately — even before the source article is live — and it auto-updates once the article publishes, without a rebuild. Do not set `og_image` by hand unless you need to override it with a specific image.

### 1. Collect the details with a wizard

Before writing anything, gather the required details from the user with the ask-questions tool (`vscode_askQuestions`). Present these as a short wizard so the user can confirm each value. Ask for all of the following, pre-filling any values the user already provided in their request:

- **Title** — the blog post title. Use sentence-style capitalization.
- **Source URL** — the link to the source article. First ask the user whether they only have a preview URL so far (for example, a Netlify deploy-preview link such as `https://deploy-preview-87--open-home-foundation.netlify.app/blog/…`). A preview URL is useful for pulling the article details, but it must not be used as the final `external_url`. If they provide a preview URL, work out the final published URL (usually the same path on the live domain, such as `https://www.openhomefoundation.org/blog/…`) and confirm it with the user before continuing.
- **External source** — the name of the site hosting the article (for example, "Open Home Foundation"). This is shown as the source label.
- **Opening text** — the teaser paragraph shown before the reader is redirected. This ends with the `<!--more-->` tag. If the user does not have one ready, offer to draft a short teaser from the article for their review.
- **Description** — the Social/OpenGraph description (roughly 120–158 characters). Often a condensed version of the opening text.
- **Author** — must match a top-level key in `source/_data/people.yml`. Verify it exists; if not, tell the user it must be added before publishing.
- **Publish date** — in `YYYY-MM-DD` format. Used for the filename, `date`, and `date_formatted` fields.
- **Category** — the blog category (for example, `Technology`).
- **Override image (optional)** — by default the social image is generated automatically from `external_url`, so leave this blank in most cases. Ask only whether the user wants to override it with a specific image URL. If they provide one, set it as `og_image` in the front matter and the plugin will leave it untouched.

If a source URL is available, fetch it to pre-fill as many of these details as possible (title, description, opening paragraph, author, date) so the user only has to confirm or correct them.

Confirm the collected values back to the user before creating the file.

### 2. Validate the details

- Verify the **author** exists as a top-level key in `source/_data/people.yml`. If missing, stop and ask the user to add the author first.
- Verify the **external URL** starts with `https://` (the OG image fetch only works over HTTPS).
- Make sure the `external_url` is the final published URL, not a preview or deploy-preview link. If the user only supplied a preview URL, confirm the resolved live URL with them before using it. The `og_image` is derived from `external_url` by the plugin, so a preview URL here would produce the wrong image.
- Generate the URL slug from the title (lowercase, hyphens for spaces, remove special characters), unless the user provides one. If the source URL already has a clean slug in its path, prefer reusing that.

### 3. Build the crosspost

Create `source/_posts/YYYY-MM-DD-slug.markdown` with this front matter and body:

```markdown
---
layout: crosspost
title: "Your crosspost title"
description: "Your Social/OpenGraph description."
date: YYYY-MM-DD 00:00:01
date_formatted: "Month DD, YYYY"
author: AuthorKey
comments: false
categories: Category
external_url: "https://example.com/full-article-url/"
external_source: "Source name"
# Optional: only add og_image to override the auto-generated social image.
# og_image: "https://example.com/custom-social-image.png"
---

Your opening teaser paragraph goes here, ending with the summary break tag.<!--more-->
```

Notes:

- Wrap `title`, `description`, `external_url`, and `external_source` values in double quotes.
- `date_formatted` is the human-readable date, such as `"June 18, 2026"`.
- `author` is the key from `people.yml`, not the display name.
- The body is only the opening teaser paragraph followed immediately by `<!--more-->`. Do not add the full article text — the reader is redirected to the source.
- Apply the same prose rules as standard posts (curly apostrophes and quotes in body text, sentence-style capitalization for the title).
- Do not add an `og_image` field in the normal case. The `crosspost_og` plugin derives it from `external_url` automatically. Add `og_image` only when the user wants to override the generated image with a specific URL — an explicit value always wins over the generated one.

### 4. Crosspost summary

After creating the file, summarize for the user:

- The output file path
- Title, external source, external URL, author (and whether verified in `people.yml`), date, and category
- The opening text and description used
- A note that the Open Graph image is derived automatically from `external_url` by the `crosspost_og` plugin, renders immediately (including the blog archive thumbnail), and auto-updates once the source article is live, with no rebuild required

## Post-processing summary

After the blog post has been created, output a summary to the user covering:

**Metadata:**
- Title, author (and whether they were verified in `people.yml`), date, category

**Images:**
- Each source image, its original dimensions/format, and where it was output (with the conversion applied)

**Content transformations:**
- A bulleted list of every notable transformation applied, such as:
  - Sections/content removed (base64 data, blog template, notes, instruction lines)
  - Image references replaced
  - Summary break conversion
  - Device list replacement (if WWHA, including brand used and number of devices)
  - Link conversions (external to HTML, internal to relative markdown)
  - Quote/blockquote formatting
  - Heading changes (reformatted, promoted/demoted, bold removed)
  - Escape character cleanup
  - Apostrophe/quote curling (straight to typographic)

**Proposed text changes (requires user approval):**
- If any typos or locale spelling issues were spotted (such as British to American English), list each one and ask the user whether to apply them. Do not apply these changes until the user confirms.
