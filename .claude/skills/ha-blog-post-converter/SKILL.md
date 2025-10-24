---
name: ha-blog-post-converter
description: Convert markdown blog posts exported from Google Docs into properly formatted Home Assistant blog posts. Use this skill when converting blog post drafts to Home Assistant's format, including fixing frontmatter, converting URLs to relative paths, organizing images, and applying proper formatting conventions.
---

# Home Assistant Blog Post Converter

## Overview

This skill converts markdown blog posts (typically exported from Google Docs) into properly formatted Home Assistant blog posts ready for publication. It handles frontmatter generation, URL conversion, image organization, and formatting cleanup following Home Assistant's blog conventions.

## When to Use This Skill

Use this skill when:

- Converting a markdown file from Google Docs into a Home Assistant blog post
- The user asks to "convert", "format", or "turn a blog post" into the proper format
- Fixing or updating an existing Home Assistant blog post
- The user mentions cleaning up Google Docs artifacts or formatting issues

## Workflow

**MANDATORY FIRST STEPS:**
1. Look at the last 3 blog posts to understand the format
2. Check the source file size with `ls -lh` and `wc -l`
3. If the file is large (>100KB or >200 lines with base64 data), go directly to Step 1 to extract images
4. **DO NOT attempt to Read the source file until images are extracted!**

**CRITICAL: DO NOT READ THE SOURCE FILE FIRST!** Files exported from Google Docs contain large embedded base64 images that will cause read failures. Always start with Step 1 to extract images before attempting to read the file.
**CRITICAL: NEVER CHANGE CONTENT!** The content must not be changed as it was written by our internal copywriter. Ensure that only the structure of the file is worked on and no text is changed.
### Step 1: Extract Base64 Images (REQUIRED FIRST STEP)

**DO THIS BEFORE READING THE FILE!** The source markdown file will be too large to read due to embedded base64 images. You MUST extract the images first:

1. **Check file size** using `wc -l` and `ls -lh` to confirm it's large
2. **Create a Python script** to extract base64 images WITHOUT reading the entire file into memory
3. **Process the file line-by-line** to avoid memory issues

The embedded images follow this pattern:

```markdown
   ![][image1]

   ...

   [image1]: <data:image/png;base64,{base64here}>
```

**Extraction requirements:**
- Extract images to `_imgtemp` folder (e.g., `_imgtemp/image1.png`, `_imgtemp/image2.png`)
- Google Docs typically uses sequential naming: image1, image2, image3, etc.
- Remove the base64 image definitions from the source file
- Replace image references with temporary placeholders: `IMGPLACEHOLDER:imageN`
- Create a new cleaned file (e.g., `source-cleaned.md`) that can be safely read

**Example Python script structure:**
```python
import re
import base64

# Process file line-by-line to avoid memory issues
# Extract base64 data when pattern matches
# Write cleaned content to new file
```

### Step 2: Analyze the Source Content

Read the source markdown file (or processed markdown if images were extracted) to understand:

- The title and main topic
- Any existing frontmatter (may be incomplete or incorrect)
- Image references
- URLs that need conversion
- Formatting issues from Google Docs export

### Step 3: Generate Blog Post Metadata

Create the required metadata:

1. **Generate the slug**: Create a shortened version of the title using 3-4 meaningful words, lowercase and hyphenated
   - Example: "Konnected joins Works with Home Assistant" → "konnected-joins-wwha"
   - Skip common stop words (the, a, and, of, with, etc.) except when essential

2. **Determine the date**: Use today's date or the date specified by the user in format `YYYY-MM-DD HH:MM:SS`

3. **Create blog post file**: `source/_posts/YYYY-MM-DD-slug.markdown`. This is where the blog content should be written to
4. **Create image directory path**: `/source/images/blog/YYYY-MM-slug/` where YYYY-MM is year-month from the date. All these files will then be available via the URL `/images/blog/YYYY-MM-slug/`.

### Step 4: Build Complete Frontmatter

Construct the YAML frontmatter with all required fields. The desired output would look something like this:

```markdown
   ---
   [frontmatter]
   ---

   <img src='/images/blog/YYYY-MM-slug/art.webp' style='border: 0;box-shadow: none;' alt="{inset blog title here}">

   First paragraph of blog. <!--more-->

   cont...
```

## First Section

Required fields:

- `layout: post`
- `title:` (in quotes)
- `description:` (1-2 sentence summary, in quotes)
- `date:` (YYYY-MM-DD HH:MM:SS format)
- `date_formatted:` (e.g., "October 7, 2025")
- `author:` (full name)
- `comments: true`
- `categories:` (common categories: Works-with-Home-Assistant, Release-Notes, etc.)
- `og_image:` (path to featured image: `/images/blog/YYYY-MM-slug/art.webp`)

### Step 5: Process URLs

Convert all Home Assistant URLs to relative paths:

- `https://home-assistant.io/path/to/page` → `/path/to/page`
- `http://home-assistant.io/path` → `/path`
- Keep external URLs (github.com, etc.) as absolute URLs

### Step 6: Organize Image References

If base64 images were extracted in Step 1, we now need to move the images from `_imagetemp` to the image directory that was made earlier. There are a few steps we should do:

- Resize images to ensure they are no wider than 900px
- Convert the images to webp lossless
- Move them to the newly created image directory for the blog post
- Replace the temporary image references in the blog post with the following:

  ```markdown
  <div class="contain nb">
    <img src="/images/blog/YYYY-MM-slug/<image>" style="width:100%;max-width:700px;">
  </div>
  ```

### Step 7: Clean Up Formatting

Remove Google Docs artifacts:

- Extra blank lines
- Inconsistent heading levels. The blog post will automatically add a h1, ensure any headings in the blog start from h2 onwards
- Malformed markdown syntax
- Spacing issues around code blocks or images
- Remove any unnecessary escape characters like `Wow\!`

Ensure proper structure:

- Featured image immediately after frontmatter
- Opening paragraph ending with `<!--more-->` comment
- Consistent heading hierarchy (`##` for main sections, `###` for subsections)

**IMPORTANT - "Read More" Marker:**

- Remove ALL variations of the read more marker text: `### **\[read more\]**`, `**[read more]**`, `[read more]`, etc.
- Replace with the proper HTML comment: `<!--more-->`
- The `<!--more-->` should be placed after the opening paragraph, before the first `##` heading
- If no read more marker exists in the source, add `<!--more-->` after the opening paragraph

Fix quotes - Sometimes we have blockquotes that get misrepresented in Google Docs. We need to convert them. Google likes to represent them like this:

```markdown
| “As a manufacturer that has relied on open standards like Matter from the very beginning, joining the Home Assistant Partner Program is a natural step for us. This allows us to make our products accessible to an even larger community and enables our customers to integrate them seamlessly into diverse smart home environments. We are convinced that the future lies in openness and interoperability – which is why we deliberately embrace partnerships that offer users long-term investment security and maximum flexibility.”  \- Kai Sepp, Sales Director North & West Europe at Eltako |
| ----- |
```

and we want it represented like this

```markdown
<div class="alert">
  <p>"As a manufacturer that has relied on open standards like Matter from the very beginning, joining the Home Assistant Partner Program is a natural step for us. This allows us to make our products accessible to an even larger community and enables our customers to integrate them seamlessly into diverse smart home environments. We are convinced that the future lies in openness and interoperability – which is why we deliberately embrace partnerships that offer users long-term investment security and maximum flexibility."</p>
  <em style="text-align: right; display: block;">- Kai Sepp, Sales Director North & West Europe at Eltako</em>
</div>
```

### Step 8: Generate the Final Output

Create the complete blog post file:

1. YAML frontmatter (between `---` markers)
2. Featured image (using `<img>` tag with proper styling)
3. Opening paragraph
4. The `<!--more-->` comment (ensuring all `[read more]` text variations are removed)
5. Remaining content with proper formatting

Save the file as: `/source/_posts/YYYY-MM-DD-slug.markdown`

### Step 9: Provide Asset Instructions

After generating the blog post, inform the user:

- Where to place image files: `/source/images/blog/YYYY-MM-slug/`
- What images are referenced in the post
- Any additional formatting recommendations

## Example Conversion

**User request:** "Turn this markdown into a blog post"

**Process:**

1. Read the source file
2. Extract base64 images using `extract_base64_images()` with quality=95
3. Extract title: "Konnected joins Works with Home Assistant"
4. Generate slug: "konnected-joins-works"
5. Create image directory: `/source/images/blog/2025-10-konnected-joins-works/`
6. Build frontmatter with all required fields
7. Convert `https://home-assistant.io/integrations/esphome/` → `/integrations/esphome/`
8. Restore image paths using `restore_image_paths()` to `/images/blog/2025-10-konnected-joins-works/`
9. Remove `### **\[read more\]**` and replace with `<!--more-->` tag
10. Clean up formatting
11. Save as `/source/_posts/2025-10-07-konnected-joins-works.markdown`
12. Inform user about image asset locations

## Notes

You will have to run `bundle i` followed by `bundle exec rake generate` to generate the website. This may generate a `Gemfile.lock` in which you should ignore this file from being committed.
