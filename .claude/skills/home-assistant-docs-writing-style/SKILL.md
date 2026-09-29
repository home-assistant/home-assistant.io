---
name: home-assistant-docs-writing-style
description: Use this when writing or editing Home Assistant documentation, website pages, integration pages, blog prose, UI instructions, or other user-facing prose.
---

# Home Assistant documentation writing style

Write Home Assistant documentation for a broad audience. Assume the reader primarily uses the UI. Make Home Assistant feel approachable, stable, and easy to use.

Present the UI as the standard and recommended way to set up, manage, and use Home Assistant. Treat YAML, templates, code, and manual editing as optional paths for cases that need them.

## Brand personality

Write in a way that reflects Home Assistant's brand personality:

- **Welcoming**: Meet readers at their own level. Never talk down to them.
- **Candid**: Be direct and honest. Do not hide complexity behind false simplicity or marketing fluff.
- **Supportive**: Guide the reader forward in a practical, patient way.
- **Generous**: Give readers what they need without overwhelming or patronizing them.
- **Independent**: Be confident, direct, and human. Home Assistant does not need to sound like a corporate tech brand.

The full brand personality guide is at [`personality.markdown`](https://raw.githubusercontent.com/home-assistant/frontend/refs/heads/dev/gallery/src/pages/brand/personality.markdown).

## Audience and tone

- Write for readers all over the world, including people who do not speak English as their first language.
- Use American English.
- Follow the Microsoft Style Guide for writing documentation.
- Use inclusive, objective, and non-discriminatory language.
- Write directly to the reader with "you" and "your" instead of "the user" or "users".
- Write in an informational and friendly tone, not a formal or overly technical tone.
- Avoid wording that makes Home Assistant sound fragile, difficult, or easy to break.
- Do not assume the reader is a developer.
- Do not label YAML-based configuration or more complex features as "advanced" unless that wording is part of the product itself.

## General language rules

- Use the Oxford comma.
- Follow grammar and syntax rules. End sentences with a period.
- Do not put two spaces after a period.
- Use flowing text in Markdown files. Do not enforce arbitrary line wrapping for prose.
- Do not use all caps for emphasis. Use italics only when emphasis is needed.
- Use **bold** for UI strings. Do not use bold for emphasis or as a heading replacement.
- Use UI breadcrumbs in this format: **Settings** > **Devices & services**.
- Use the word "Home Assistant" in full. Do not use "HA" or "HASS".
- Use sentence-style capitalization for headings and titles.
- Do not use "e.g.", "i.e.", "etc.", or "etcetera". Use "like", "for example", or "such as" instead.
- Prefer "select" over "click" unless you specifically mean a mouse action, such as right-clicking or double-clicking.
- Do not use "master/slave". Use alternatives such as "client/server", "leader/follower", "main/replica", or "controller/device".
- Match the official capitalization of brand names, services, protocols, integrations, and platforms. For example, use "Z-Wave", not "Zwave", "Z-wave", "Z Wave", or "ZWave".
- Follow the terminology rules listed in `.textlintrc.json`.

## Lists

- Surround lists with blank lines.
- Use a numbered list for sequential steps, procedures, or prioritized items.
- Use a bulleted list for non-sequential items or when order does not matter.
- Begin each item with a capital letter unless there is a reason not to, such as a command or code block.
- Do not use semicolons, commas, or conjunctions such as "and" or "or" at the end of list items.
- If at least one item in a list is a complete sentence, use periods at the end of all items in that list.
- Do not use periods at the end of list items if none of the items are complete sentences.

## Content structure

- Start pages with a brief overview or introduction.
- Use progressive disclosure: basic information first, more complex details later.
- Break longer content into logical sections with clear headings.
- Prefer lists over tables because tables often do not render well on mobile devices.
- Use SEO, LLMO, and GEO techniques only when they help people find content without hurting clarity, trust, or readability.
- Foster internal linking when it helps readers find related information.
- Use relevant long-tail words, phrases, and keywords only when they fit naturally.

## Integration and platform content

- Start with the UI path when an integration can be set up from the UI.
- Include reusable snippets like `{% include integrations/config_flow.md %}` when they apply.
- Use `source/_integrations/_integration_docs_template.markdown` as the starting point for integration pages.
- Keep integration pages close to the current template structure:
  - Introduction
  - Supported devices
  - Unsupported devices
  - Prerequisites
  - Configuration
  - Configuration options
  - Supported functionality
  - Triggers, conditions, and actions
  - Examples
  - Data updates
  - Known limitations
  - Troubleshooting
  - Community notes
  - Removing the integration
- Document triggers, conditions, and actions in separate files under `source/_triggers`, `source/_conditions`, and `source/_actions`, and include them from the integration page.
- Use `document-integration-docs` when creating or substantially updating integration documentation.

## Deprecated features or integrations

When a feature is deprecated or an integration is removed from Home Assistant, remove its documentation.

- If a feature is deprecated, remove the related section from the integration page.
- Do not add a deprecation notice to the documentation.
- If an entire integration is deprecated, follow the steps on [removing an integration page](https://developers.home-assistant.io/docs/documenting/remove-page).

## Other documentation rules

- Do not invent new dashboard, card, automation, or script examples unless explicitly asked.
- Improving existing automation, script, or dashboard examples is allowed, but keep it to clarifications, comments, or small simplifications such as removing defaults or unnecessary code.
- If an integration or platform is renamed, update the documentation as well.
- If you rename or move a page, add an entry to `_redirects`. This also applies when content is moved within the documentation.
- When adding a blog post to `source/_posts`, the author in the `author` front matter must exist as a top-level key in `source/_data/people.yml`. If the author is not present, add them before the post can be published.
