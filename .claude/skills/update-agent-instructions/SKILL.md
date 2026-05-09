---
name: update-agent-instructions
description: Use this if the user wants to update the agent instructions for the Home Assistant website.
---

# Update Agent Instructions

Update the agent instructions for the Home Assistant website.

Review `.github/copilot-instructions.md` against these current home-assistant.io style-guide sources:

- `./source/_integrations/_integration_docs_template.markdown`
- `https://raw.githubusercontent.com/home-assistant/developers.home-assistant/master/docs/documenting/integration-docs-examples.md`
- `https://raw.githubusercontent.com/home-assistant/developers.home-assistant/master/docs/documenting/standards.md`
- `https://raw.githubusercontent.com/home-assistant/developers.home-assistant/master/docs/documenting/general-style-guide.md`

Update only `.github/copilot-instructions.md`.

Rules:
- Preserve the existing structure and wording where possible.
- Prefer small, reviewable edits over broad rewrites.
- Remove exact duplicates.
- Merge overlapping guidance only when the meaning is the same or one source clearly supersedes the other.
- If existing instructions conflict with the referenced style guides, update them to match the style guides.
- Summarize guidance into actionable instructions. Do not copy large examples, templates, or explanatory text unless needed.
- Do not make wrapping-only or other arbitrary style edits.
- Do not edit any other files, including `AGENTS.md`, `GEMINI.md`, or `CLAUDE.md`.

If any remote source cannot be fetched, stop and report the missing source instead of guessing.

After editing, provide a short summary of the changes made.
